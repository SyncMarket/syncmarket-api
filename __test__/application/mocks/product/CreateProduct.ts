import { CreateProductInterface } from '@application/interfaces';
import { ProductDTO, Product } from '@core/interfaces';
import { makeFakeProduct } from '@test/core/entities';

/* eslint-disable @typescript-eslint/no-unused-vars */
export class CreateProductStub implements CreateProductInterface {
    async execute(request: ProductDTO): Promise<Product> {
        return makeFakeProduct();
    }
}
