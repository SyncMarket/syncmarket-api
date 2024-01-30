import { InMemoryCustomerRepository } from '@test/application/repositories';
import { GetCustomers } from '@application/usecases';
import { GetRequest } from '@core/interfaces';
import { makeFakeCustomerEntity } from '@test/core/entities';

describe('GetCustomers', () => {
    type SutTypes = {
        usecase: GetCustomers;
        repository: InMemoryCustomerRepository;
    };

    const makeSut = (): SutTypes => {
        const repository = new InMemoryCustomerRepository();
        const usecase = new GetCustomers(repository);

        return {
            usecase,
            repository,
        };
    };

    const makeGetRequest = (): GetRequest => {
        return {
            page: 1,
            pageSize: 10,
        };
    };

    it('should call GetCustomersRepository with correct data', async () => {
        const { repository, usecase } = makeSut();

        const getSpy = jest.spyOn(repository, 'get');
        const usecaseSpy = jest.spyOn(usecase, 'execute');

        const request = makeGetRequest();

        await usecase.execute(request);
        expect(usecaseSpy).toHaveBeenCalledWith(request);

        request.page = (request.page - 1) * request.pageSize;
        expect(getSpy).toHaveBeenCalledWith(request);
    });

    it('should return a list of customers', async () => {
        const { usecase, repository } = makeSut();

        const request = makeGetRequest();

        await repository.create(makeFakeCustomerEntity());

        const { page } = await usecase.execute(request);

        expect(page.elements).toBe(1);
    });
});
