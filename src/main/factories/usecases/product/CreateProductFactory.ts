import { CreateProduct } from '@application/usecases';
import { ProductRepository } from '@infra/database/mongodb';

export const makeCreateProduct = (): CreateProduct => {
    const productRepository = new ProductRepository();

    return new CreateProduct(productRepository);
};
