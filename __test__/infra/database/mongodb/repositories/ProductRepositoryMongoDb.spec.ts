import { makeFakeProductMongo } from '@test/infra/database/mongodb';
import { Collection } from 'mongodb';
import {
    ProductModelMongoDb,
    ProductRepositoryMongoDb,
    mongoDB,
} from '@infra/database/mongodb';

describe('productRepository', () => {
    let productCollection: Collection<ProductModelMongoDb>;

    beforeAll(async () => {
        mongoDB.database = mongoDB.client.db('syncmarket_test');

        productCollection = ProductRepositoryMongoDb.getCollection();

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
            const productRepository = new ProductRepositoryMongoDb();

            const product = makeFakeProductMongo();

            const response = await productRepository.create(product);

            expect(response).toBeTruthy();

            const count = await productCollection.countDocuments();

            expect(count).toBe(1);
        });
    });

    describe('getProductBySku', () => {
        it('should return a product on success', async () => {
            const productRepository = new ProductRepositoryMongoDb();

            const productEntity = makeFakeProductMongo();

            await productRepository.create(productEntity);

            const product = await productRepository.getBySku(productEntity.sku);

            expect(product).toBeTruthy();
        });
    });

    describe('getProductByNbm', () => {
        it('should return a product on success', async () => {
            const productRepository = new ProductRepositoryMongoDb();

            const productEntity = makeFakeProductMongo();

            await productRepository.create(productEntity);

            const product = await productRepository.getByNbm(productEntity.nbm);

            expect(product).toBeTruthy();
        });
    });

    describe('getProductById', () => {
        it('should return a product on success', async () => {
            const productRepository = new ProductRepositoryMongoDb();

            const fakeProduct = makeFakeProductMongo();

            const { id } = await productRepository.create(fakeProduct);

            const productEntity = await productRepository.getById(id);

            expect(productEntity).toBeTruthy();
        });
    });

    describe('updateProduct', () => {
        it('should update a product on success', async () => {
            const productRepository = new ProductRepositoryMongoDb();

            const fakeProduct = makeFakeProductMongo();

            const productEntity = await productRepository.create(fakeProduct);

            await productRepository.update({
                ...productEntity,
                name: 'Product Updated',
            });

            const { name } = await productRepository.getById(productEntity.id);

            expect(name).toBe('Product Updated');
        });
    });
});
