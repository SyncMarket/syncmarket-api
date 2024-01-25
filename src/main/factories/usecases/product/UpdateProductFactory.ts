import { UpdateProduct } from '@application/usecases';
import { ProductRepositoryMongoDb } from '@infra/database/mongodb';

export const makeUpdateProduct = (): UpdateProduct => {
    const productRepositoryMongoDb = new ProductRepositoryMongoDb();

    return new UpdateProduct(
        productRepositoryMongoDb,
        productRepositoryMongoDb,
        productRepositoryMongoDb,
        productRepositoryMongoDb,
    );
};
