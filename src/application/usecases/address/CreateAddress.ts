import {
    CreateAddressInterface,
    CreateAddressRepository,
    GetCustomerByIdRepository,
    UpdateCustomerRepository,
} from '@application/interfaces';
import { left, right } from '@core/either';
import { AddressEntity } from '@core/entities';
import { CustomerNotFoundError } from '@core/errors';
import { CustomerAddress } from '@core/interfaces';

export class CreateAddress implements CreateAddressInterface {
    constructor(
        private readonly createAddressRepository: CreateAddressRepository,
        private readonly getCustomerByIdRepository: GetCustomerByIdRepository,
        private readonly updateCustomerRepository: UpdateCustomerRepository,
    ) {}

    async execute(
        request: CreateAddressInterface.Request,
    ): Promise<CreateAddressInterface.Response> {
        const { addressDTO, customerId } = request;

        const customerEntity =
            await this.getCustomerByIdRepository.getById(customerId);

        if (!customerEntity) {
            return left(new CustomerNotFoundError(customerId));
        }

        const addressEntity = new AddressEntity(addressDTO);

        const { id } = await this.createAddressRepository.create(addressEntity);

        const customerAddress: CustomerAddress = {
            id,
            city: addressEntity.city,
            state: addressEntity.state,
            street: addressEntity.street,
            number: addressEntity.number,
            zipcode: addressEntity.zipcode,
            complement: addressEntity.complement,
            neighborhood: addressEntity.neighborhood,
            type: addressEntity.type,
            isMain: addressEntity.isMain,
            country: addressEntity.country,
            phoneNumber: addressEntity.phoneNumber,
        };

        customerEntity.addresses.push(customerAddress);

        await this.updateCustomerRepository.update({
            id: customerId,
            data: customerEntity,
        });

        const address = { ...addressEntity, id };

        return right(address);
    }
}
