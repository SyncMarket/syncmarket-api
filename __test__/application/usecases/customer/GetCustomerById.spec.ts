import { GetCustomerById } from '@application/usecases';
import { CustomerNotFoundError } from '@core/errors';
import { InMemoryCustomerRepository } from '@test/application/repositories';
import { makeFakeCustomerEntity } from '@test/core/entities';

describe('GetCustomerById', () => {
    type SutTypes = {
        usecase: GetCustomerById;
        repository: InMemoryCustomerRepository;
    };

    const makeSut = (): SutTypes => {
        const repository = new InMemoryCustomerRepository();
        const usecase = new GetCustomerById(repository);

        return {
            usecase,
            repository,
        };
    };

    it('should call GetCustomerByIdRepository with correct data', async () => {
        const { usecase, repository } = makeSut();

        const getByIdSpy = jest.spyOn(repository, 'getById');

        const fakeCustomer = makeFakeCustomerEntity();

        const { id } = await repository.create(fakeCustomer);

        await usecase.execute(id);

        expect(getByIdSpy).toHaveBeenCalledWith(id);
    });

    it('should return CustomerNotFoundError if customer does not exists', async () => {
        const { usecase } = makeSut();

        const fakeId = 'fakeId';

        const result = await usecase.execute(fakeId);

        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toEqual(new CustomerNotFoundError(fakeId));
    });

    it('should return customer if customer exists', async () => {
        const { usecase, repository } = makeSut();

        const fakeCustomer = makeFakeCustomerEntity();

        const { id } = await repository.create(fakeCustomer);

        const result = await usecase.execute(id);

        expect(result.isRight()).toBeTruthy();
        expect(result.value).toEqual({ ...fakeCustomer, id });
    });
});
