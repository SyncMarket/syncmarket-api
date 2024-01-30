import { UpdateCustomerController } from '@infra/http/controllers';
import { makeUpdateCustomer } from '@main/factories/usecases';

export const makeUpdateCustomerController = (): UpdateCustomerController => {
    const updateCustomer = makeUpdateCustomer();

    return new UpdateCustomerController(updateCustomer);
};
