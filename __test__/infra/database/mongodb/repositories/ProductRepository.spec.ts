import {
    ProductModel,
    ProductRepository,
    mongoDB,
} from '@infra/database/mongodb';
import { makeFakeProductMongo } from '@test/infra/database/mongodb';
import { Collection } from 'mongodb';

describe('productRepository', () => {
    let productCollection: Collection<ProductModel>;

    beforeAll(async () => {
        mongoDB.database = mongoDB.client.db('syncmarket_test');

        productCollection = ProductRepository.getCollection();

        await mongoDB.connect();
    });

    afterAll(async () => {
        await mongoDB.disconnect();
    });

    beforeEach(async () => {
        await productCollection.deleteMany({});
    });

    describe('createProduct', () => {
        it('should create a new product and return an id on success', async () => {
            const productRepository = new ProductRepository();

            const product = makeFakeProductMongo();

            const response = await productRepository.create(product);

            expect(response).toBeTruthy();

            const count = await productCollection.countDocuments();

            expect(count).toBe(1);
        });
    });
});
