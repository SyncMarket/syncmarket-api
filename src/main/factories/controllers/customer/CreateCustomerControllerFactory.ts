import { CreateCustomerController } from '@infra/http/controllers';
import { makeCreateCustomer } from '@main/factories/usecases';

export const makeCreateCustomerController = (): CreateCustomerController => {
    const createCustomer = makeCreateCustomer();

    return new CreateCustomerController(createCustomer);
};
