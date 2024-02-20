import { GetProductByIdController } from '@infra/http/controllers';
import { makeGetProductById } from '@main/factories/usecases';

export const makeGetProductByIdController = (): GetProductByIdController => {
    const getProductById = makeGetProductById();

    return new GetProductByIdController(getProductById);
};
