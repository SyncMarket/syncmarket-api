import {
    CreateCustomerRepository,
    DeleteCustomerRepository,
    GetCustomerByDocumentRepository,
    GetCustomerByEmailRepository,
    GetCustomerByIdRepository,
    UpdateCustomerRepository,
} from '@application/interfaces';
import { CustomerRepository } from '@application/repositories';
import { CustomerEntity } from '@core/entities';
import { Utils } from '@core/utils';

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
        this.items = Utils.sortByProperty(this.items, 'createdAt');

        return customerEntity;
    }

    public async getByEmail(
        email: GetCustomerByEmailRepository.Request,
    ): Promise<GetCustomerByEmailRepository.Response> {
        return Utils.searchByProperty({
            items: this.items,
            property: 'email',
            target: email,
        });
    }

    public async getByDocument(
        document: GetCustomerByDocumentRepository.Request,
    ): Promise<GetCustomerByDocumentRepository.Response> {
        return Utils.searchByProperty({
            items: this.items,
            property: 'document',
            target: document,
        });
    }

    public async getById(
        id: GetCustomerByIdRepository.Request,
    ): Promise<GetCustomerByIdRepository.Response> {
        return Utils.searchByProperty({
            items: this.items,
            property: 'id',
            target: id,
        });
    }

    async update(
        request: UpdateCustomerRepository.Request,
    ): Promise<UpdateCustomerRepository.Response> {
        const { data, id } = request;

        const productIndex = this.items.findIndex((item) => item.id === id);

        this.items[productIndex] = data;
    }

    public async delete(
        id: DeleteCustomerRepository.Request,
    ): Promise<DeleteCustomerRepository.Response> {
        const customer = Utils.searchByProperty({
            items: this.items,
            property: 'id',
            target: id,
        });

        customer.deletedAt = new Date();
        customer.isDeleted = true;
    }
}
