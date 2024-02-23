import { GetCustomerByIdInterface } from '@application/interfaces';
import {
    AddressRepository,
    CustomerRepository,
} from '@application/repositories';
import { left, right } from '@core/either';
import { CustomerNotFoundError } from '@core/errors';
import { Customer } from '@core/interfaces';

export class GetCustomerById implements GetCustomerByIdInterface {
    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly addressRepository: AddressRepository,
    ) {}

    async execute(
        id: GetCustomerByIdInterface.Request,
    ): Promise<GetCustomerByIdInterface.Response> {
        const customerEntity = await this.customerRepository.getById(id);
        if (!customerEntity) {
            return left(new CustomerNotFoundError(id));
        }
        const addresses = await this.addressRepository.getByCustomer(id);
        const customer: Customer = {
            id: id,
            addresses: addresses,
            birthDate: customerEntity.birthDate,
            cartId: null,
            document: customerEntity.document,
            email: customerEntity.email,
            name: customerEntity.name,
            phoneNumber: customerEntity.phoneNumber,
            isActive: customerEntity.isActive,
            isDeleted: customerEntity.isDeleted,
            createdAt: customerEntity.createdAt,
            updatedAt: customerEntity.updatedAt,
            deletedAt: customerEntity.deletedAt,
        };
        return right(customer);
    }
}
