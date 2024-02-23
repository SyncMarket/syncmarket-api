import { AddressRepository } from '@application/repositories';
import { Collection } from 'mongodb';
import {
    CreateAddressRepository,
    GetAddressesByCustomerRepository,
    GetAddressesRepository,
    UpdateAddressRepository,
} from '@application/interfaces';
import {
    AddressMapperMongoDb,
    AddressModelMongoDb,
    mongoDB,
    stringToObjectId,
} from '@infra/database/mongodb';
import { AddressEntity } from '@core/entities';

export class AddressRepositoryMongoDb implements AddressRepository {
    private readonly collection: Collection<AddressModelMongoDb>;

    static getCollection(): Collection<AddressModelMongoDb> {
        return mongoDB.getCollection<AddressModelMongoDb>('address');
    }

    constructor() {
        this.collection = AddressRepositoryMongoDb.getCollection();
    }

    public async create(
        data: CreateAddressRepository.Request,
    ): Promise<CreateAddressRepository.Response> {
        const model = AddressMapperMongoDb.toModel(data);
        const { insertedId } = await this.collection.insertOne(model);
        const entity = AddressMapperMongoDb.toEntity({
            ...model,
            _id: insertedId,
        });

        return entity;
    }

    public async getById(id: string): Promise<AddressEntity> {
        const model = await this.collection.findOne({
            _id: stringToObjectId(id),
        });

        if (!model) {
            return null;
        }

        return AddressMapperMongoDb.toEntity(model);
    }

    public async get(
        request: GetAddressesRepository.Request,
    ): Promise<GetAddressesRepository.Response> {
        const { page, pageSize } = request;

        const models = await this.collection
            .find()
            .skip(page)
            .limit(pageSize)
            .toArray();

        const total = await this.collection.countDocuments();

        const data = models.map((model) =>
            AddressMapperMongoDb.toEntity(model),
        );

        return {
            data: data,
            page: {
                elements: data.length,
                totalElements: total,
                number: page,
            },
        };
    }

    public async update(
        request: UpdateAddressRepository.Request,
    ): Promise<void> {
        const { id, data } = request;
        await this.collection.updateOne(
            { _id: stringToObjectId(id) },
            { $set: AddressMapperMongoDb.toModel(data) },
        );
    }

    public async getByCustomer(
        customerId: GetAddressesByCustomerRepository.Request,
    ): Promise<GetAddressesByCustomerRepository.Response> {
        const addressesModels = await this.collection
            .find({
                customerId: stringToObjectId(customerId),
            })
            .toArray();
        const addressesEntities = addressesModels.map((address) =>
            AddressMapperMongoDb.toEntity(address),
        );
        return addressesEntities;
    }
}
