import { UpdateProductController } from '@infra/http/controllers';
import { makeUpdateProduct } from '@main/factories/usecases';

export const makeUpdateProductController = (): UpdateProductController => {
    const usecases = makeUpdateProduct();
    return new UpdateProductController(usecases);
};
