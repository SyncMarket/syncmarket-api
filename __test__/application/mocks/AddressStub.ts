import {
    CreateAddressInterface,
    GetAddressByIdInterface,
    GetAddressesInterface,
    UpdateAddressInterface,
} from '@application/interfaces';
import {
    AddressRepository,
    CustomerRepository,
} from '@application/repositories';
import {
    CreateAddress,
    GetAddressById,
    GetAddresses,
    UpdateAddress,
} from '@application/usecases';

import {
    InMemoryAddressRepository,
    InMemoryCustomerRepository,
} from '@test/application/repositories';

export type AddressStubType<T> = {
    usecase: T;
    repository: AddressRepository;
    customerRepository?: CustomerRepository;
};

export class AddressStub {
    static createStub(): AddressStubType<CreateAddressInterface> {
        const repository = new InMemoryAddressRepository();
        const customerRepository = new InMemoryCustomerRepository();
        const usecase = new CreateAddress(repository, customerRepository);
        return { usecase, repository, customerRepository };
    }

    static getByIdStub(): AddressStubType<GetAddressByIdInterface> {
        const repository = new InMemoryAddressRepository();
        const customerRepository = new InMemoryCustomerRepository();
        const usecase = new GetAddressById(repository);
        return { usecase, repository, customerRepository };
    }

    static getStub(): AddressStubType<GetAddressesInterface> {
        const repository = new InMemoryAddressRepository();
        const usecase = new GetAddresses(repository);
        return { usecase, repository };
    }

    static updateStub(): AddressStubType<UpdateAddressInterface> {
        const repository = new InMemoryAddressRepository();
        const usecase = new UpdateAddress(repository);
        return { usecase, repository };
    }
}
