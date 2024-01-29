import {
    CreateCustomerRepository,
    GetCustomerByDocumentRepository,
    GetCustomerByEmailRepository,
    GetCustomerByIdRepository,
} from '@application/interfaces';
import { CustomerRepository } from '@application/repositories';
import { CustomerEntity } from '@core/entities';

export class InMemoryCustomerRepository implements CustomerRepository {
    public items: CustomerEntity[];

    constructor() {
        this.items = [];
    }

    public async create(
        data: CreateCustomerRepository.Request,
    ): Promise<CreateCustomerRepository.Response> {
        const customerEntity = { ...data, id: 'id' };

        this.items.push(customerEntity);

        return customerEntity;
    }

    public async getByEmail(
        email: GetCustomerByEmailRepository.Request,
    ): Promise<GetCustomerByEmailRepository.Response> {
        return this.items.find((item) => item.email === email) ?? null;
    }

    public async getByDocument(
        document: GetCustomerByDocumentRepository.Request,
    ): Promise<GetCustomerByDocumentRepository.Response> {
        return this.items.find((item) => item.document === document) ?? null;
    }

    public async getById(
        id: GetCustomerByIdRepository.Request,
    ): Promise<GetCustomerByIdRepository.Response> {
        return this.items.find((item) => item.id === id) ?? null;
    }
}
