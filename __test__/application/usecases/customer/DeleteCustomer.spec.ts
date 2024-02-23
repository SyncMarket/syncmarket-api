import { makeFakeCustomerEntity } from '@test/core/entities';
import { CustomerNotFoundError } from '@core/errors';
import { CustomerStub } from '@test/application/mocks';

describe('DeleteCustomer', () => {
    const { repository, usecase } = CustomerStub.delete();

    it('should call DeleteCustomerRepository with correct data', async () => {
        const deleteSpy = jest.spyOn(repository, 'delete');
        const fakeCustomerEntity = makeFakeCustomerEntity();
        const { id } = await repository.create(fakeCustomerEntity);
        await usecase.execute(id);
        const customer = await repository.getById(id);
        expect(customer.isDeleted).toBeTruthy();
        expect(customer.deletedAt).toBeTruthy();
        expect(deleteSpy).toHaveBeenCalledWith(id);
    });

    it('should return CustomerNotFoundError if customer does not exists', async () => {
        const response = await usecase.execute('fakeId');
        expect(response.isLeft()).toBeTruthy();
        expect(response.value).toEqual(new CustomerNotFoundError('fakeId'));
    });

    it('should return void if customer was deleted', async () => {
        const fakeCustomerEntity = makeFakeCustomerEntity();
        const { id } = await repository.create(fakeCustomerEntity);
        const response = await usecase.execute(id);
        expect(response.isRight()).toBeTruthy();
        expect(response.value).toBeNull();
    });
});
