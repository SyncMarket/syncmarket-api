import { CreateAddress } from '@application/usecases';
import {
    AddressRepositoryMongoDb,
    CustomerRepositoryMongoDb,
} from '@infra/database/mongodb';

export class AddressFactory {
    static create(): CreateAddress {
        const addressRepositoryMongoDb = new AddressRepositoryMongoDb();
        const customerRepositoryMongoDb = new CustomerRepositoryMongoDb();

        return new CreateAddress(
            addressRepositoryMongoDb,
            customerRepositoryMongoDb,
        );
    }
}
