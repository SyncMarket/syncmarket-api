import { CreateCustomerRepository } from '@application/interfaces';
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
        const customerEntity = new CustomerEntity(data);

        this.items.push(customerEntity);

        return customerEntity;
    }

    public async getByEmail(
        email: string,
    ): Promise<CreateCustomerRepository.Response> {
        return this.items.find((item) => item.email === email) ?? null;
    }

    public async getByDocument(
        document: string,
    ): Promise<CreateCustomerRepository.Response> {
        return this.items.find((item) => item.document === document) ?? null;
    }
}
