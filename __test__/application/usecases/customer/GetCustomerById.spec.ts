import { CustomerNotFoundError } from '@core/errors';
import { Customer } from '@core/interfaces';
import { CustomerStub } from '@test/application/mocks';
import { makeFakeCustomerEntity } from '@test/core/entities';

describe('GetCustomerById', () => {
    const { repository, usecase } = CustomerStub.getById();

    it('should call GetCustomerByIdRepository with correct data', async () => {
        const getByIdSpy = jest.spyOn(repository, 'getById');
        const fakeCustomer = makeFakeCustomerEntity();
        const { id } = await repository.create(fakeCustomer);
        await usecase.execute(id);
        expect(getByIdSpy).toHaveBeenCalledWith(id);
    });

    it('should return CustomerNotFoundError if customer does not exists', async () => {
        const fakeId = 'fakeId';
        const result = await usecase.execute(fakeId);
        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toEqual(new CustomerNotFoundError(fakeId));
    });

    it('should return customer if customer exists', async () => {
        const fakeCustomerEntity = makeFakeCustomerEntity();
        const { id } = await repository.create(fakeCustomerEntity);
        const result = await usecase.execute(id);
        expect(result.isRight()).toBeTruthy();
        const customer: Customer = {
            ...fakeCustomerEntity,
            id: id,
            addresses: [],
            cartId: null,
        };
        expect(result.value).toEqual(customer);
    });
});
