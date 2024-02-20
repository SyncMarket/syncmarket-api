import { GetProduct } from '@application/usecases';
import { ProductRepositoryMongoDb } from '@infra/database/mongodb';

export const makeGetProduct = (): GetProduct => {
    const productRepositoryMongoDb = new ProductRepositoryMongoDb();

    return new GetProduct(productRepositoryMongoDb);
};
