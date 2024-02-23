import { CreateAddressInterface } from '@application/interfaces';
import {
    makeFakeAddressDTO,
    makeFakeAddressEntity,
    makeFakeCustomerEntity,
} from '@test/core/entities';
import { CustomerNotFoundError } from '@core/errors';
import { AddressStub } from '@test/application';

describe('CreateAddress', () => {
    const createStub = AddressStub.createStub();

    it('should call CreateAddressRepository with correct data', async () => {
        const { usecase, repository, customerRepository } = createStub;

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
        const { usecase } = createStub;
        const fakeAddressDTO = makeFakeAddressDTO();

        const request: CreateAddressInterface.Request = {
            addressDTO: fakeAddressDTO,
            customerId: 'invalidCustomerId',
        };
        const response = await usecase.execute(request);

        expect(response.isLeft()).toBeTruthy();
        expect(response.value).toEqual(
            new CustomerNotFoundError('invalidCustomerId'),
        );
    });

    it('should return an address on success', async () => {
        const { usecase, customerRepository } = createStub;
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
