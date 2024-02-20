import { GetCustomerByIdController } from '@infra/http/controllers';
import { left } from '@core/either';
import { CustomerNotFoundError } from '@core/errors';
import { GetCustomerByIdInterface } from '@application/interfaces';
import { notFound } from '@infra/http/helpers';
import { CustomerRepository } from '@application/repositories';
import { makeFakeCustomerEntity } from '@test/core/entities';
import { InMemoryCustomerRepository } from '@test/application/repositories';
import { GetCustomerById } from '@application/usecases';

describe('GetCustomerByIdController', () => {
    type SutTypes = {
        controller: GetCustomerByIdController;
        usecase: GetCustomerByIdInterface;
        repository: CustomerRepository;
    };

    const makeSut = (): SutTypes => {
        const repository = new InMemoryCustomerRepository();
        const usecase = new GetCustomerById(repository);
        const controller = new GetCustomerByIdController(usecase);

        return { controller, repository, usecase };
    };

    const errors = {
        notFound: new CustomerNotFoundError('invalid_id'),
    };

    it('should call GetCustomerById with correct data', async () => {
        const { controller } = makeSut();

        const executeSpy = jest.spyOn(controller, 'execute');

        const httpRequest = {
            params: {
                id: 'customerId',
            },
        };

        await controller.handle(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest);
    });

    it('should return 404 if GetCustomerById returns an error', async () => {
        const { controller } = makeSut();

        jest.spyOn(controller, 'execute').mockReturnValueOnce(
            Promise.resolve({ statusCode: 404 }),
        );

        const httpRequest = {
            params: {
                id: 'invalid_id',
            },
        };

        const httpResponse = await controller.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(404);
    });

    it('should return CustomerNotFoundError if GetCustomerById returns an error', async () => {
        const { controller, usecase } = makeSut();

        jest.spyOn(usecase, 'execute').mockImplementation(async () =>
            left(errors.notFound),
        );

        const httpRequest = {
            params: {
                id: 'invalid_id',
            },
        };

        const httpResponse = await controller.handle(httpRequest);

        expect(httpResponse).toEqual(notFound(errors.notFound));
    });

    it('should return 200 on success', async () => {
        const { controller, repository } = makeSut();

        const httpRequest = {
            params: {
                id: 'customerId',
            },
        };

        const fakeCustomerEntity = makeFakeCustomerEntity();

        await repository.create(fakeCustomerEntity);

        const httpResponse = await controller.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(200);
    });

    it('should return Customer on success', async () => {
        const { controller, repository } = makeSut();

        const httpRequest = {
            params: {
                id: 'customerId',
            },
        };

        const fakeCustomerEntity = await repository.create(
            makeFakeCustomerEntity(),
        );

        const httpResponse = await controller.handle(httpRequest);

        expect(httpResponse.body).toEqual(fakeCustomerEntity);
    });
});
