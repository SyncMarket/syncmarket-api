import { GetCustomerByIdController } from '@infra/http/controllers';
import { makeGetCustomerById } from '@main/factories/usecases';

export const makeGetCustomerByIdController = (): GetCustomerByIdController => {
    const getCustomerById = makeGetCustomerById();

    return new GetCustomerByIdController(getCustomerById);
};
