import {
    CreateCustomerRepository,
    GetCustomerByDocumentRepository,
    GetCustomerByEmailRepository,
} from '@application/interfaces';

export abstract class CustomerRepository
    implements
        CreateCustomerRepository,
        GetCustomerByEmailRepository,
        GetCustomerByDocumentRepository
{
    abstract create(
        data: CreateCustomerRepository.Request,
    ): Promise<CreateCustomerRepository.Response>;

    abstract getByEmail(
        email: GetCustomerByEmailRepository.Request,
    ): Promise<GetCustomerByEmailRepository.Response>;

    abstract getByDocument(
        document: GetCustomerByDocumentRepository.Request,
    ): Promise<GetCustomerByDocumentRepository.Response>;
}
