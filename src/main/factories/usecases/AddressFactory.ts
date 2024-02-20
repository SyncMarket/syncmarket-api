import {
    CreateAddress,
    GetAddressById,
    GetAddresses,
    UpdateAddress,
} from '@application/usecases';
import {
    AddressRepositoryMongoDb,
    CustomerRepositoryMongoDb,
} from '@infra/database/mongodb';

export class AddressFactory {
    static create(): CreateAddress {
        const addressRepository = new AddressRepositoryMongoDb();
        const customerRepository = new CustomerRepositoryMongoDb();
        return new CreateAddress(addressRepository, customerRepository);
    }

    static getById(): GetAddressById {
        const addressRepository = new AddressRepositoryMongoDb();
        return new GetAddressById(addressRepository);
    }

    static get(): GetAddresses {
        const addressRepository = new AddressRepositoryMongoDb();
        return new GetAddresses(addressRepository);
    }

    static update(): UpdateAddress {
        const addressRepository = new AddressRepositoryMongoDb();
        return new UpdateAddress(addressRepository);
    }
}
