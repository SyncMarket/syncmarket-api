import { DeleteCustomerController } from '@infra/http/controllers';
import { makeDeleteCustomer } from '@main/factories/usecases';

export const makeDeleteCustomerController = (): DeleteCustomerController => {
    const customerRepositoryMongoDb = makeDeleteCustomer();

    return new DeleteCustomerController(customerRepositoryMongoDb);
};
