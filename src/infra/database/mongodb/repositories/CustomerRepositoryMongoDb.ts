import { CustomerRepository } from '@application/repositories';
import { Collection } from 'mongodb';
import {
    CustomerMapperMongoDb,
    CustomerModelMongoDb,
    mongoDB,
} from '@infra/database/mongodb';
import {
    CreateCustomerRepository,
    GetCustomerByDocumentRepository,
    GetCustomerByEmailRepository,
} from '@application/interfaces';

export class CustomerRepositoryMongoDb implements CustomerRepository {
    private readonly collection: Collection<CustomerModelMongoDb>;

    constructor() {
        this.collection = CustomerRepositoryMongoDb.getCollection();
    }

    static getCollection() {
        return mongoDB.getCollection<CustomerModelMongoDb>('customer');
    }

    public async create(
        entity: CreateCustomerRepository.Request,
    ): Promise<CreateCustomerRepository.Response> {
        const customerModel = CustomerMapperMongoDb.toModel(entity);

        const { insertedId } = await this.collection.insertOne(customerModel);

        return CustomerMapperMongoDb.toEntity({
            ...customerModel,
            _id: insertedId,
        });
    }

    public async getByDocument(
        document: GetCustomerByDocumentRepository.Request,
    ): Promise<GetCustomerByDocumentRepository.Response> {
        const customerModel = await this.collection.findOne({
            document,
        });

        if (!customerModel) {
            return null;
        }

        return CustomerMapperMongoDb.toEntity(customerModel);
    }

    public async getByEmail(
        email: GetCustomerByEmailRepository.Request,
    ): Promise<GetCustomerByEmailRepository.Response> {
        const customerModel = await this.collection.findOne({
            email,
        });

        if (!customerModel) {
            return null;
        }

        return CustomerMapperMongoDb.toEntity(customerModel);
    }
}
