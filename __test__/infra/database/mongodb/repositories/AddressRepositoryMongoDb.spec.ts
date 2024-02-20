import { Collection, ObjectId } from 'mongodb';
import {
    AddressModelMongoDb,
    AddressRepositoryMongoDb,
    mongoDB,
    objectIdToString,
} from '@infra/database/mongodb';
import { makeFakeAddressMongo } from '@test/infra/database/mongodb';

describe('AddressRepositoryMongoDb', () => {
    let collection: Collection<AddressModelMongoDb>;
    let repository: AddressRepositoryMongoDb;

    beforeAll(async () => {
        mongoDB.database = mongoDB.client.db('syncmarket_test');

        collection = AddressRepositoryMongoDb.getCollection();
        repository = new AddressRepositoryMongoDb();

        await mongoDB.connect();
    });

    afterAll(async () => {
        await mongoDB.disconnect();
    });

    beforeEach(async () => {
        await collection.deleteMany({});
    });

    describe('createAddress', () => {
        it('should create a address and return success', async () => {
            const addressRepository = new AddressRepositoryMongoDb();

            const address = makeFakeAddressMongo();

            const response = await addressRepository.create(address);
            expect(response).toBeTruthy();

            const count = await collection.countDocuments();

            expect(count).toBe(1);
            expect(response).toEqual({ ...address, id: response.id });
        });
    });

    describe('getAddressById', () => {
        it('should return an address', async () => {
            const address = makeFakeAddressMongo();
            const { id } = await repository.create(address);
            const response = await repository.getById(id);
            expect(response).toEqual({ ...address, id });
        });

        it('should return null if address not found', async () => {
            const invalidId = objectIdToString(new ObjectId());
            const response = await repository.getById(invalidId);
            expect(response).toBeNull();
        });
    });

    describe('getAddresses', () => {
        it('should return addresses', async () => {
            const address = makeFakeAddressMongo();
            const { id } = await repository.create(address);
            const response = await repository.get({ page: 0, pageSize: 10 });
            expect(response).toEqual({
                data: [{ ...address, id }],
                page: {
                    elements: 1,
                    totalElements: 1,
                    number: 0,
                },
            });
            expect(response.data[0]).toEqual({ ...address, id });
        });
    });
});
