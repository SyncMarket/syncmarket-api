import { GetCustomerById } from '@application/usecases';
import { CustomerRepositoryMongoDb } from '@infra/database/mongodb';

export const makeGetCustomerById = (): GetCustomerById => {
    const customerRepositoryMongoDb = new CustomerRepositoryMongoDb();

    return new GetCustomerById(customerRepositoryMongoDb);
};
