import { CreateAddress } from '@application/usecases';
import { CreateAddressInterface } from '@application/interfaces';
import {
    AddressRepository,
    CustomerRepository,
} from '@application/repositories';
import {
    InMemoryAddressRepository,
    InMemoryCustomerRepository,
} from '@test/application/repositories';
import {
    makeFakeAddressDTO,
    makeFakeAddressEntity,
    makeFakeCustomerEntity,
} from '@test/core/entities';
import { CustomerNotFoundError } from '@core/errors';
import { CustomerAddress } from '@core/interfaces';

describe('CreateAddress', () => {
    type SutTypes = {
        usecase: CreateAddressInterface;
        repository: AddressRepository;
        customerRepository: CustomerRepository;
    };

    const makeSut = (): SutTypes => {
        const repository = new InMemoryAddressRepository();
        const customerRepository = new InMemoryCustomerRepository();
        const usecase = new CreateAddress(
            repository,
            customerRepository,
            customerRepository,
        );

        return { usecase, repository, customerRepository };
    };

    it('should call CreateAddressRepository with correct data', async () => {
        const { usecase, repository, customerRepository } = makeSut();

        const createSpy = jest.spyOn(repository, 'create');
        const fakeAddressDTO = makeFakeAddressDTO();
        const fakeAddressEntity = makeFakeAddressEntity();
        const fakeCustomerEntity = makeFakeCustomerEntity();

        await customerRepository.create(fakeCustomerEntity);

        const request: CreateAddressInterface.Request = {
            addressDTO: fakeAddressDTO,
            customerId: 'customerId',
        };
        const response = await usecase.execute(request);

        if (response.isRight()) {
            fakeAddressEntity.createdAt = response.value.createdAt;
        }

        expect(response.isRight()).toBeTruthy();
        expect(createSpy).toHaveBeenCalledWith(fakeAddressEntity);
    });

    it('should return CustomerNotFoundError if customer does not exist', async () => {
        const { usecase } = makeSut();
        const fakeAddressDTO = makeFakeAddressDTO();

        const request: CreateAddressInterface.Request = {
            addressDTO: fakeAddressDTO,
            customerId: 'customerId',
        };
        const response = await usecase.execute(request);

        expect(response.isLeft()).toBeTruthy();
        expect(response.value).toEqual(new CustomerNotFoundError('customerId'));
    });

    it('should save address on customer', async () => {
        const { usecase, customerRepository } = makeSut();
        const fakeCustomerEntity = makeFakeCustomerEntity();

        const { id: customerId } =
            await customerRepository.create(fakeCustomerEntity);

        const fakeAddressDTO = makeFakeAddressDTO();

        const request: CreateAddressInterface.Request = {
            addressDTO: fakeAddressDTO,
            customerId: customerId,
        };
        const response = await usecase.execute(request);
        const customer = await customerRepository.getById(customerId);
        const customerAddres: CustomerAddress = {
            ...fakeAddressDTO,
            id: 'addressId',
        };

        expect(response.isRight()).toBeTruthy();
        expect(customer.addresses[0]).toEqual(customerAddres);
    });

    it('should return an address on success', async () => {
        const { usecase, customerRepository } = makeSut();
        const fakeAddressDTO = makeFakeAddressDTO();
        const fakeAddressEntity = makeFakeAddressEntity();
        const fakeCustomerEntity = makeFakeCustomerEntity();

        await customerRepository.create(fakeCustomerEntity);

        const request: CreateAddressInterface.Request = {
            addressDTO: fakeAddressDTO,
            customerId: 'customerId',
        };
        const response = await usecase.execute(request);
        const address = { ...fakeAddressEntity, id: 'addressId' };

        if (response.isRight()) {
            address.createdAt = response.value.createdAt;
        }

        expect(response.isRight()).toBeTruthy();
        expect(response.value).toEqual(address);
    });
});
