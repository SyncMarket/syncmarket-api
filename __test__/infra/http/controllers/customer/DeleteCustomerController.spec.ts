import { DeleteCustomerInterface } from '@application/interfaces';
import { DeleteCustomerController } from '@infra/http/controllers';
import { CustomerRepository } from '@application/repositories';
import { InMemoryCustomerRepository } from '@test/application/repositories';
import { DeleteCustomer } from '@application/usecases';
import { makeFakeCustomerEntity } from '@test/core/entities';
import { HttpRequest } from '@infra/http/interfaces';
import { CustomerNotFoundError } from '@core/errors';

describe('DeleteCustomerController', () => {
    type SutTypes = {
        controller: DeleteCustomerController;
        usecase: DeleteCustomerInterface;
        repository: CustomerRepository;
    };

    const makeSut = (): SutTypes => {
        const repository = new InMemoryCustomerRepository();
        const usecase = new DeleteCustomer(repository, repository);
        const controller = new DeleteCustomerController(usecase);

        return { controller, usecase, repository };
    };

    const makeHttpRequest = (): HttpRequest<undefined, { id: string }> => {
        return {
            params: {
                id: 'customerId',
            },
        };
    };

    it('should call DeleteCustomerController with correct data', async () => {
        const { controller, repository, usecase } = makeSut();

        const executeSpy = jest.spyOn(usecase, 'execute');

        const fakeCustomerEntity = makeFakeCustomerEntity();

        await repository.create(fakeCustomerEntity);

        const httpRequest = makeHttpRequest();

        await controller.handle(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.id);
    });

    it('should return 404 if CustomerNotFoundError', async () => {
        const { controller } = makeSut();

        const httpRequest = makeHttpRequest();

        const httpResponse = await controller.handle(httpRequest);

        expect(httpResponse.body).toEqual(
            new CustomerNotFoundError('customerId').message,
        );
        expect(httpResponse.statusCode).toBe(404);
    });

    it('should return 204 if DeleteCustomer succeeds', async () => {
        const { controller, repository } = makeSut();

        const fakeCustomerEntity = makeFakeCustomerEntity();

        await repository.create(fakeCustomerEntity);

        const httpRequest = makeHttpRequest();

        const httpResponse = await controller.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(204);
    });
});
