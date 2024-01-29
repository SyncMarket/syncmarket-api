import {
    CreateCustomerRepository,
    GetCustomerByDocumentRepository,
    GetCustomerByEmailRepository,
    GetCustomerByIdRepository,
} from '@application/interfaces';

export abstract class CustomerRepository
    implements
        CreateCustomerRepository,
        GetCustomerByEmailRepository,
        GetCustomerByDocumentRepository,
        GetCustomerByIdRepository
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

    abstract getById(
        id: GetCustomerByIdRepository.Request,
    ): Promise<GetCustomerByIdRepository.Response>;
}
