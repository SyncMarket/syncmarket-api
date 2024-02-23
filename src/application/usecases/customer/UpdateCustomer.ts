import { UpdateCustomerInterface } from '@application/interfaces';
import {
    AddressRepository,
    CustomerRepository,
} from '@application/repositories';
import { left, right } from '@core/either';
import { CustomerEntity } from '@core/entities';
import {
    CustomerNotFoundError,
    DocumentAlreadyExistsError,
    EmailAlreadyExistsError,
} from '@core/errors';
import { Customer } from '@core/interfaces';

export class UpdateCustomer implements UpdateCustomerInterface {
    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly addressRepository: AddressRepository,
    ) {}

    async execute(
        request: UpdateCustomerInterface.Request,
    ): Promise<UpdateCustomerInterface.Response> {
        const { id, data } = request;
        const customerEntity = await this.customerRepository.getById(id);
        if (!customerEntity) {
            return left(new CustomerNotFoundError(id));
        }
        if (data.document) {
            const documentAlreadyExists =
                await this.customerRepository.getByDocument(data.document);

            if (documentAlreadyExists) {
                return left(new DocumentAlreadyExistsError(data.document));
            }
        }
        if (data.email) {
            const emailAlreadyExists = await this.customerRepository.getByEmail(
                data.email,
            );

            if (emailAlreadyExists) {
                return left(new EmailAlreadyExistsError(data.email));
            }
        }
        const updatedCustomerEntity: CustomerEntity = {
            ...customerEntity,
            ...request.data,
        };
        const addresses = await this.addressRepository.getByCustomer(id);
        await this.customerRepository.update({
            data: updatedCustomerEntity,
            id,
        });
        const customer: Customer = {
            id: id,
            addresses: addresses,
            birthDate: updatedCustomerEntity.birthDate,
            cartId: null,
            document: updatedCustomerEntity.document,
            email: updatedCustomerEntity.email,
            name: updatedCustomerEntity.name,
            phoneNumber: updatedCustomerEntity.phoneNumber,
            isActive: updatedCustomerEntity.isActive,
            isDeleted: updatedCustomerEntity.isDeleted,
            createdAt: updatedCustomerEntity.createdAt,
            updatedAt: updatedCustomerEntity.updatedAt,
            deletedAt: updatedCustomerEntity.deletedAt,
        };
        return right(customer);
    }
}
