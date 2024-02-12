import { AddressRepository } from '@application/repositories';
import { Collection } from 'mongodb';
import { CreateAddressRepository } from '@application/interfaces';
import {
    AddressMapperMongoDb,
    AddressModelMongoDb,
    mongoDB,
} from '@infra/database/mongodb';

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
}
