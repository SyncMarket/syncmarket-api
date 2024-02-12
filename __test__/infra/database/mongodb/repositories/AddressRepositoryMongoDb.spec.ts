import { Collection } from 'mongodb';
import {
    AddressModelMongoDb,
    AddressRepositoryMongoDb,
    mongoDB,
} from '@infra/database/mongodb';
import { makeFakeAddressMongo } from '@test/infra/database/mongodb';

describe('AddressRepositoryMongoDb', () => {
    let addressCollection: Collection<AddressModelMongoDb>;

    beforeAll(async () => {
        mongoDB.database = mongoDB.client.db('syncmarket_test');

        addressCollection = AddressRepositoryMongoDb.getCollection();

        await mongoDB.connect();
    });

    afterAll(async () => {
        await mongoDB.disconnect();
    });

    beforeEach(async () => {
        await addressCollection.deleteMany({});
    });

    describe('createAddress', () => {
        it('should create a address and return success', async () => {
            const addressRepository = new AddressRepositoryMongoDb();

            const address = makeFakeAddressMongo();

            const response = await addressRepository.create(address);

            expect(response).toBeTruthy();

            const count = await addressCollection.countDocuments();

            expect(count).toBe(1);
        });
    });
});
