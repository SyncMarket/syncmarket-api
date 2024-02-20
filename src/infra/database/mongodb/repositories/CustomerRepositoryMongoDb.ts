import { CustomerRepository } from '@application/repositories';
import { Collection } from 'mongodb';
import {
    CustomerMapperMongoDb,
    CustomerModelMongoDb,
    mongoDB,
    stringToObjectId,
} from '@infra/database/mongodb';
import {
    CreateCustomerRepository,
    DeleteCustomerRepository,
    GetCustomerByDocumentRepository,
    GetCustomerByEmailRepository,
    GetCustomerByIdRepository,
    GetCustomersRepository,
    UpdateCustomerRepository,
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

    public async getById(
        id: GetCustomerByIdRepository.Request,
    ): Promise<GetCustomerByIdRepository.Response> {
        const customerModel = await this.collection.findOne({
            _id: stringToObjectId(id),
        });

        if (!customerModel) {
            return null;
        }

        return CustomerMapperMongoDb.toEntity(customerModel);
    }

    async update(
        request: UpdateCustomerRepository.Request,
    ): Promise<UpdateCustomerRepository.Response> {
        const { data, id } = request;

        await this.collection.updateOne(
            {
                _id: stringToObjectId(id),
            },
            {
                $set: CustomerMapperMongoDb.toModel(data),
            },
        );
    }

    async delete(
        id: DeleteCustomerRepository.Request,
    ): Promise<DeleteCustomerRepository.Response> {
        await this.collection.updateOne(
            {
                _id: stringToObjectId(id),
            },
            {
                $set: {
                    isDeleted: true,
                    deletedAt: new Date(),
                },
            },
        );
    }

    public async get(
        request: GetCustomersRepository.Request,
    ): Promise<GetCustomersRepository.Response> {
        const { page, pageSize } = request;

        const customerModelGroup = await this.collection
            .find()
            .skip(page)
            .limit(pageSize)
            .toArray();

        const total = await this.collection.countDocuments();

        const data = customerModelGroup.map((customerModel) =>
            CustomerMapperMongoDb.toEntity(customerModel),
        );

        return {
            data: data,
            page: {
                number: page,
                elements: data.length,
                totalElements: total,
            },
        };
    }
}
