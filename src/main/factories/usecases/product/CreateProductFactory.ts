import { CreateProduct } from '@application/usecases';
import { ProductRepositoryMongoDb } from '@infra/database/mongodb';

export const makeCreateProduct = (): CreateProduct => {
    const productRepository = new ProductRepositoryMongoDb();

    return new CreateProduct(
        productRepository,
        productRepository,
        productRepository,
    );
};
