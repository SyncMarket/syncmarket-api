import {
    CreateCustomerRepository,
    DeleteCustomerRepository,
    GetCustomerByDocumentRepository,
    GetCustomerByEmailRepository,
    GetCustomerByIdRepository,
    GetCustomersRepository,
    UpdateCustomerRepository,
} from '@application/interfaces';

export abstract class CustomerRepository
    implements
        CreateCustomerRepository,
        GetCustomerByEmailRepository,
        GetCustomerByDocumentRepository,
        GetCustomerByIdRepository,
        UpdateCustomerRepository,
        DeleteCustomerRepository,
        GetCustomersRepository
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

    abstract update(
        request: UpdateCustomerRepository.Request,
    ): Promise<UpdateCustomerRepository.Response>;

    abstract delete(
        id: DeleteCustomerRepository.Request,
    ): Promise<DeleteCustomerRepository.Response>;

    abstract get(
        request: GetCustomersRepository.Request,
    ): Promise<GetCustomersRepository.Response>;
}
