import { GetProductController } from '@infra/http/controllers';
import { makeGetProduct } from '@main/factories/usecases';

export const makeGetProductController = (): GetProductController => {
    const getProduct = makeGetProduct();

    return new GetProductController(getProduct);
};
