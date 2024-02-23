import {
    CreateCustomerInterface,
    DeleteCustomerInterface,
    GetCustomerByIdInterface,
    UpdateCustomerInterface,
} from '@application/interfaces';
import {
    CreateCustomer,
    DeleteCustomer,
    GetCustomerById,
    UpdateCustomer,
} from '@application/usecases';
import {
    InMemoryAddressRepository,
    InMemoryCustomerRepository,
} from '@test/application/repositories';
import { AuthStub } from './AuthStub';

export type CustomerStubType<T> = {
    usecase: T;
    repository: InMemoryCustomerRepository;
    addressRepository?: InMemoryAddressRepository;
};

export class CustomerStub {
    static create(): CustomerStubType<CreateCustomerInterface> {
        const repository = new InMemoryCustomerRepository();
        const addressRepository = new InMemoryAddressRepository();
        const signUpMock = new AuthStub();
        const usecase = new CreateCustomer(
            repository,
            addressRepository,
            signUpMock,
        );
        return { usecase, repository, addressRepository };
    }

    static getById(): CustomerStubType<GetCustomerByIdInterface> {
        const repository = new InMemoryCustomerRepository();
        const addressRepository = new InMemoryAddressRepository();
        const usecase = new GetCustomerById(repository, addressRepository);
        return { usecase, repository, addressRepository };
    }

    static update(): CustomerStubType<UpdateCustomerInterface> {
        const repository = new InMemoryCustomerRepository();
        const addressRepository = new InMemoryAddressRepository();
        const usecase = new UpdateCustomer(repository, addressRepository);
        return { usecase, repository, addressRepository };
    }

    static delete(): CustomerStubType<DeleteCustomerInterface> {
        const repository = new InMemoryCustomerRepository();
        const usecase = new DeleteCustomer(repository);
        return { usecase, repository };
    }
}
