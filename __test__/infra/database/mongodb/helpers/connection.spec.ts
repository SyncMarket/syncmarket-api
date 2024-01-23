import { mongoDB } from '@infra/database/mongodb';

describe('MongoDB Connection', () => {
    beforeAll(async () => {
        await mongoDB.connect();
    });

    afterAll(async () => {
        await mongoDB.disconnect();
    });

    it('should reconnect if mongodb is down', async () => {
        let collection = mongoDB.getCollection('product');

        expect(collection).toBeTruthy();

        await mongoDB.disconnect();

        collection = mongoDB.getCollection('product');

        expect(collection).toBeTruthy();
    });
});
