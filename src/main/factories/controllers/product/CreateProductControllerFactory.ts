import { CreateProductController } from '@infra/http/controllers';
import { makeCreateProduct } from '@main/factories/usecases';

export const makeCreateProductController = (): CreateProductController => {
    const usecases = makeCreateProduct();

    return new CreateProductController(usecases);
};
