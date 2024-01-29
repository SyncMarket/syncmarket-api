import { CreateCustomerController } from '@infra/http/controllers';
import { makeCreateCustomer } from '@main/factories/usecases/customer/CreateCustomerFactory';

export const makeCreateCustomerController = (): CreateCustomerController => {
    const createCustomer = makeCreateCustomer();

    return new CreateCustomerController(createCustomer);
};
