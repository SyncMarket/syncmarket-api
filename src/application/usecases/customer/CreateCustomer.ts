import {
    CreateCustomerInterface,
    SignUpInterface,
} from '@application/interfaces';
import {
    AddressRepository,
    CustomerRepository,
} from '@application/repositories';
import { left, right } from '@core/either';
import { CustomerEntity } from '@core/entities';
import {
    DocumentAlreadyExistsError,
    EmailAlreadyExistsError,
} from '@core/errors';
import { Customer } from '@core/interfaces';

export class CreateCustomer implements CreateCustomerInterface {
    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly addressRepository: AddressRepository,
        private readonly signUpProvider: SignUpInterface,
    ) {}

    public async execute(
        request: CreateCustomerInterface.Request,
    ): Promise<CreateCustomerInterface.Response> {
        const emailAlreadyExists = await this.customerRepository.getByEmail(
            request.email,
        );
        if (emailAlreadyExists) {
            return left(new EmailAlreadyExistsError(request.email));
        }
        const documentAlreadyExists =
            await this.customerRepository.getByDocument(request.document);
        if (documentAlreadyExists) {
            return left(new DocumentAlreadyExistsError(request.document));
        }
        const customerEntity = new CustomerEntity(request);
        await this.signUpProvider.signUp({
            email: request.email,
            password: request.password,
        });
        const { id } = await this.customerRepository.create(customerEntity);
        const customer: Customer = {
            id: id,
            addresses: [],
            birthDate: customerEntity.birthDate,
            cartId: request.cartId,
            document: customerEntity.document,
            email: customerEntity.email,
            name: customerEntity.name,
            phoneNumber: customerEntity.phoneNumber,
            isActive: true,
            isDeleted: false,
            createdAt: new Date(),
            deletedAt: null,
            updatedAt: null,
        };
        const addressesEntity = await this.addressRepository.getByCustomer(id);
        customer.addresses = addressesEntity;
        return right(customer);
    }
}
