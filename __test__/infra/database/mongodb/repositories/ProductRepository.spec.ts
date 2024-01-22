import { ENV } from '@core/config';
import { MongoConnection, ProductRepository } from '@infra/database/mongodb';
import { makeFakeProduct } from '@test/infra/database/mongodb';

describe('productRepository', () => {
    const productCollection = ProductRepository.getCollection();
    const mongoConnection = new MongoConnection(ENV.DATABASE_URL);

    beforeAll(async () => {
        await mongoConnection.connect();
    });

    afterAll(async () => {
        await mongoConnection.disconnect();
    });

    beforeEach(async () => {
        await productCollection.deleteMany({});
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
