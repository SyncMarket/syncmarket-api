import { UpdateCustomer } from '@application/usecases';
import { CustomerRepositoryMongoDb } from '@infra/database/mongodb';

export const makeUpdateCustomer = (): UpdateCustomer => {
    const customerRepositoryMongoDb = new CustomerRepositoryMongoDb();

    return new UpdateCustomer(
        customerRepositoryMongoDb,
        customerRepositoryMongoDb,
        customerRepositoryMongoDb,
        customerRepositoryMongoDb,
    );
};
