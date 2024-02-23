import {
    makeFakeCustomerDTO,
    makeFakeCustomerEntity,
} from '@test/core/entities';
import {
    DocumentAlreadyExistsError,
    EmailAlreadyExistsError,
} from '@core/errors';
import { CustomerStub } from '@test/application/mocks';
import { Customer } from '@core/interfaces';

describe('CreateCustomer', () => {
    const { repository, usecase } = CustomerStub.create();

    beforeEach(() => {
        repository.items = [];
    });

    it('should call CreateCustomerRepository with correct data', async () => {
        const createCustomerSpy = jest.spyOn(repository, 'create');
        const fakeCustomerDTO = makeFakeCustomerDTO();
        const fakeCustomerEntity = makeFakeCustomerEntity();
        const customerEntity = await usecase.execute(fakeCustomerDTO);
        expect(customerEntity.isRight()).toBeTruthy();
        if (customerEntity.isRight()) {
            fakeCustomerEntity.createdAt = customerEntity.value.createdAt;
        }
        expect(createCustomerSpy).toHaveBeenCalledWith(fakeCustomerEntity);
    });

    it('should return EmailAlreadyExistsError if email already exists', async () => {
        const fakeCustomerDTO = makeFakeCustomerDTO();
        await usecase.execute(fakeCustomerDTO);
        const customer = await usecase.execute(fakeCustomerDTO);
        expect(customer.isLeft).toBeTruthy();
        expect(customer.value).toEqual(
            new EmailAlreadyExistsError(fakeCustomerDTO.email),
        );
    });

    it('should return DocumentAlreadyExistsError if document already exists', async () => {
        const fakeCustomerDTO = makeFakeCustomerDTO();
        await usecase.execute(fakeCustomerDTO);
        fakeCustomerDTO.email = 'email2@mail.com';
        const customer = await usecase.execute(fakeCustomerDTO);
        expect(customer.isLeft).toBeTruthy();
        expect(customer.value).toEqual(
            new DocumentAlreadyExistsError(fakeCustomerDTO.document),
        );
    });

    it('should return CustomerEntity if success', async () => {
        const fakeCustomerDTO = makeFakeCustomerDTO();
        const fakeCustomerEntity = makeFakeCustomerEntity();
        const response = await usecase.execute(fakeCustomerDTO);
        expect(response.isRight()).toBeTruthy();
        const customer: Customer = {
            ...fakeCustomerEntity,
            id: 'customerId',
            addresses: [],
            cartId: null,
        };
        expect({ ...response.value, createdAt: new Date(0) }).toEqual(customer);
    });
});
