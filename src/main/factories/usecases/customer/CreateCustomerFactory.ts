import { CreateCustomer } from '@application/usecases';
import { AuthProvider } from '@infra/authentication';
import { CustomerRepositoryMongoDb } from '@infra/database/mongodb';

export const makeCreateCustomer = (): CreateCustomer => {
    const authProvider = new AuthProvider();
    const customerRepositoryMongoDb = new CustomerRepositoryMongoDb();

    return new CreateCustomer(
        customerRepositoryMongoDb,
        customerRepositoryMongoDb,
        customerRepositoryMongoDb,
        authProvider,
    );
};
