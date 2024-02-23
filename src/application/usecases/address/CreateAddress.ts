import { CreateAddressInterface } from '@application/interfaces';
import {
    AddressRepository,
    CustomerRepository,
} from '@application/repositories';
import { left, right } from '@core/either';
import { AddressEntity } from '@core/entities';
import { CustomerNotFoundError } from '@core/errors';
import { Address } from '@core/interfaces';

export class CreateAddress implements CreateAddressInterface {
    constructor(
        private readonly addressRepository: AddressRepository,
        private readonly customerRepository: CustomerRepository,
    ) {}

    async execute(
        request: CreateAddressInterface.Request,
    ): Promise<CreateAddressInterface.Response> {
        const { addressDTO, customerId } = request;

        const customerEntity =
            await this.customerRepository.getById(customerId);

        if (!customerEntity) {
            return left(new CustomerNotFoundError(customerId));
        }

        const addressEntity = new AddressEntity(addressDTO);

        const { id } = await this.addressRepository.create(addressEntity);

        const address: Address = { ...addressEntity, id };

        return right(address);
    }
}
