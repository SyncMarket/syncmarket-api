import { InMemoryCustomerRepository } from '@test/application/repositories';
import { DeleteCustomer } from '@application/usecases';
import { makeFakeCustomerEntity } from '@test/core/entities';
import { CustomerNotFoundError } from '@core/errors';

describe('DeleteCustomer', () => {
    type SutTypes = {
        usecase: DeleteCustomer;
        repository: InMemoryCustomerRepository;
    };

    const makeSut = (): SutTypes => {
        const repository = new InMemoryCustomerRepository();
        const usecase = new DeleteCustomer(repository, repository);

        return {
            usecase,
            repository,
        };
    };

    it('should call DeleteCustomerRepository with correct data', async () => {
        const { repository, usecase } = makeSut();

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
        const { usecase } = makeSut();

        const response = await usecase.execute('fakeId');

        expect(response.isLeft()).toBeTruthy();
        expect(response.value).toEqual(new CustomerNotFoundError('fakeId'));
    });

    it('should return void if customer was deleted', async () => {
        const { usecase, repository } = makeSut();

        const fakeCustomerEntity = makeFakeCustomerEntity();

        const { id } = await repository.create(fakeCustomerEntity);

        const response = await usecase.execute(id);

        expect(response.isRight()).toBeTruthy();
        expect(response.value).toBeNull();
    });
});
