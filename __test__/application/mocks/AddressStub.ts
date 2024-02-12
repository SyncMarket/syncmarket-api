import { CreateAddressInterface } from '@application/interfaces';
import {
    AddressRepository,
    CustomerRepository,
} from '@application/repositories';
import { CreateAddress } from '@application/usecases';
import {
    InMemoryAddressRepository,
    InMemoryCustomerRepository,
} from '@test/application/repositories';

export type CreateAddressStubType = {
    usecase: CreateAddressInterface;
    repository: AddressRepository;
    customerRepository: CustomerRepository;
};

export class AddressStub {
    static createStub(): CreateAddressStubType {
        const repository = new InMemoryAddressRepository();
        const customerRepository = new InMemoryCustomerRepository();
        const usecase = new CreateAddress(repository, customerRepository);

        return { usecase, repository, customerRepository };
    }
}
