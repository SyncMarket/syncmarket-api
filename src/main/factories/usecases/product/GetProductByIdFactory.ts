import { GetProductById } from '@application/usecases';
import { ProductRepositoryMongoDb } from '@infra/database/mongodb';

export const makeGetProductById = (): GetProductById => {
    const productRepositoryMongoDb = new ProductRepositoryMongoDb();

    return new GetProductById(productRepositoryMongoDb);
};
