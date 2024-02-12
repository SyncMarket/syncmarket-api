import {
    CreateAddressInterface,
    GetAddressByIdInterface,
} from '@application/interfaces';
import {
    AddressRepository,
    CustomerRepository,
} from '@application/repositories';
import { CreateAddress } from '@application/usecases';
import { GetAddresById } from '@application/usecases/address/GetAddressById';
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
        const usecase = new GetAddresById(repository);

        return { usecase, repository, customerRepository };
    }
}
