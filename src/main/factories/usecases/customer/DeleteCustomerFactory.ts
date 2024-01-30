import { DeleteCustomer } from '@application/usecases';
import { CustomerRepositoryMongoDb } from '@infra/database/mongodb';

export const makeDeleteCustomer = (): DeleteCustomer => {
    const customerRepositoryMongoDb = new CustomerRepositoryMongoDb();

    return new DeleteCustomer(
        customerRepositoryMongoDb,
        customerRepositoryMongoDb,
    );
};
