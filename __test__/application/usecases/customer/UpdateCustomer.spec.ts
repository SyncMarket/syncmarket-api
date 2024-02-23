import { makeFakeCustomerEntity } from '@test/core/entities';
import {
    CustomerNotFoundError,
    DocumentAlreadyExistsError,
    EmailAlreadyExistsError,
} from '@core/errors';
import { CustomerStub } from '@test/application/mocks';
import { Customer } from '@core/interfaces';

describe('UpdateCustomer', () => {
    const { repository, usecase } = CustomerStub.update();

    const errors = {
        customerNotFound: new CustomerNotFoundError('fakeId'),
        emailAlreadyExists: new EmailAlreadyExistsError('email'),
        documentAlreadyExists: new DocumentAlreadyExistsError('document'),
    };

    it('should call UpdateCustomerRepository with correct data', async () => {
        const updateSpy = jest.spyOn(repository, 'update');
        const fakeCustomerEntity = makeFakeCustomerEntity();
        const { id } = await repository.create(fakeCustomerEntity);
        await usecase.execute({ id, data: { name: 'new name' } });
        const updateRequest = {
            ...fakeCustomerEntity,
            name: 'new name',
            id,
        };
        expect(updateSpy).toHaveBeenCalledWith({
            id,
            data: updateRequest,
        });
    });

    it('should return CustomerNotFoundError if customer does not exists', async () => {
        const fakeId = 'fakeId';
        const result = await usecase.execute({
            id: fakeId,
            data: makeFakeCustomerEntity(),
        });
        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toEqual(errors.customerNotFound);
    });

    it('should return EmailAlreadyExistsError if email already exists', async () => {
        const fakeCustomerEntity = makeFakeCustomerEntity();
        const { id } = await repository.create(fakeCustomerEntity);
        await repository.create(fakeCustomerEntity);
        const result = await usecase.execute({
            id,
            data: { email: fakeCustomerEntity.email },
        });
        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toEqual(errors.emailAlreadyExists);
    });

    it('should return DocumentAlreadyExistsError if document already exists', async () => {
        const fakeCustomerEntity = makeFakeCustomerEntity();
        const { id } = await repository.create(fakeCustomerEntity);
        await repository.create(fakeCustomerEntity);
        const result = await usecase.execute({
            id,
            data: { document: fakeCustomerEntity.document },
        });
        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toEqual(errors.documentAlreadyExists);
    });

    it('should return customer if customer was updated', async () => {
        const fakeCustomerEntity = makeFakeCustomerEntity();
        const { id } = await repository.create(fakeCustomerEntity);
        const result = await usecase.execute({
            id,
            data: { name: 'new name' },
        });
        const customer: Customer = {
            ...fakeCustomerEntity,
            id: id,
            name: 'new name',
            addresses: [],
            cartId: null,
        };
        expect(result.isRight()).toBeTruthy();
        expect(result.value).toEqual(customer);
    });
});
