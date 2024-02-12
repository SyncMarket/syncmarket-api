import { AddressRepository } from '@application/repositories';
import { Collection } from 'mongodb';
import { CreateAddressRepository } from '@application/interfaces';
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
}