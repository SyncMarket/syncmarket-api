import { ENV } from '@core/config';
import {
    MongoConnection,
    ProductRepository,
    mongoDB,
} from '@infra/database/mongodb';
import { makeFakeProduct } from '@test/infra/database/mongodb';

describe('productRepository', () => {
    const productCollection = ProductRepository.getCollection();

    beforeAll(async () => {
        mongoDB.database = mongoDB.client.db('syncmarket_test');
        await mongoDB.connect();
    });

    afterAll(async () => {
        await mongoDB.disconnect();
    });

    describe('createproduct', () => {
        it('should create a new product and return an id on success', async () => {
            const productRepository = new ProductRepository();

            const product = makeFakeProduct();

            const response = await productRepository.create(product);

            expect(response).toBeTruthy();

            const count = await productCollection.countDocuments();

            expect(count).toBe(1);
        });
    });
});
