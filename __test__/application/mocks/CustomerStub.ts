import {
    CreateCustomerInterface,
    CreateCustomerRepository,
    GetCustomerByDocumentRepository,
    GetCustomerByEmailRepository,
    SignUpInterface,
} from '@application/interfaces';
import { left, right } from '@core/either';
import { CustomerEntity } from '@core/entities';
import {
    DocumentAlreadyExistsError,
    EmailAlreadyExistsError,
} from '@core/errors';
import { CustomerDTO } from '@core/interfaces';

export class CreateCustomerStub implements CreateCustomerInterface {
    constructor(
        private readonly createCustomerRepository: CreateCustomerRepository,
        private readonly getCustomerByEmailRepository: GetCustomerByEmailRepository,
        private readonly getCustomerByDocumentRepository: GetCustomerByDocumentRepository,
        private readonly signUpProvider: SignUpInterface,
    ) {}

    async execute(
        request: CustomerDTO,
    ): Promise<CreateCustomerInterface.Response> {
        const emailAlreadyExists =
            await this.getCustomerByEmailRepository.getByEmail(request.email);

        if (emailAlreadyExists) {
            return left(new EmailAlreadyExistsError(request.email));
        }

        const documentAlreadyExists =
            await this.getCustomerByDocumentRepository.getByDocument(
                request.document,
            );

        if (documentAlreadyExists) {
            return left(new DocumentAlreadyExistsError(request.document));
        }

        const customerEntity = new CustomerEntity(request);

        const { id } =
            await this.createCustomerRepository.create(customerEntity);

        await this.signUpProvider.signUp({
            email: request.email,
            password: request.password,
        });

        const customer = { ...customerEntity, id };

        return right(customer);
    }
}
