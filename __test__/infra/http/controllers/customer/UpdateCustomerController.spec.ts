import { UpdateCustomerController } from '@infra/http/controllers';
import { CustomerRepository } from '@application/repositories';
import { InMemoryCustomerRepository } from '@test/application/repositories';
import { UpdateCustomer } from '@application/usecases';
import { makeFakeCustomerEntity } from '@test/core/entities';
import { HttpRequest } from '@infra/http/interfaces';
import { CustomerDTO } from '@core/interfaces';
import {
    CustomerNotFoundError,
    DocumentAlreadyExistsError,
    EmailAlreadyExistsError,
} from '@core/errors';

describe('UpdateCustomerController', () => {
    type SutTypes = {
        controller: UpdateCustomerController;
        repository: CustomerRepository;
        usecase: UpdateCustomer;
    };

    const errors = {
        notFound: new CustomerNotFoundError('customerId'),
        emailAlreadyExists: new EmailAlreadyExistsError('email'),
        documentAlreadyExists: new DocumentAlreadyExistsError('document'),
    };

    const makeSut = (): SutTypes => {
        const repository = new InMemoryCustomerRepository();
        const usecase = new UpdateCustomer(
            repository,
            repository,
            repository,
            repository,
        );
        const controller = new UpdateCustomerController(usecase);

        return { controller, repository, usecase };
    };

    const makeHttpRequest = (): HttpRequest<
        Partial<CustomerDTO>,
        { id: string }
    > => {
        return {
            body: {
                name: 'new name',
            },
            params: {
                id: 'customerId',
            },
        };
    };

    it('should call UpdateCustomerController with correct data', async () => {
        const { controller, usecase, repository } = makeSut();

        const executeSpy = jest.spyOn(usecase, 'execute');

        const fakeCustomerEntity = makeFakeCustomerEntity();

        const { id } = await repository.create(fakeCustomerEntity);

        const httpRequest = makeHttpRequest();

        await controller.handle(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith({ id, data: httpRequest.body });
    });

    it('should return 404 if returns CustomerNotFoundError', async () => {
        const { controller } = makeSut();

        const httpRequest = makeHttpRequest();

        const response = await controller.handle(httpRequest);

        expect(response.body).toEqual(errors.notFound.message);
        expect(response.statusCode).toBe(404);
    });

    it('should return 409 if returns EmailAlreadyExistsError', async () => {
        const { controller, repository } = makeSut();

        const fakeCustomerEntity = makeFakeCustomerEntity();

        await repository.create(fakeCustomerEntity);

        const httpRequest = makeHttpRequest();

        httpRequest.body.email = fakeCustomerEntity.email;

        const response = await controller.handle(httpRequest);

        expect(response.body).toEqual(errors.emailAlreadyExists.message);
        expect(response.statusCode).toBe(409);
    });

    it('should return 409 if returns DocumentAlreadyExistsError', async () => {
        const { controller, repository } = makeSut();

        const fakeCustomerEntity = makeFakeCustomerEntity();

        await repository.create(fakeCustomerEntity);

        const httpRequest = makeHttpRequest();

        httpRequest.body.document = fakeCustomerEntity.document;

        const response = await controller.handle(httpRequest);

        expect(response.body).toEqual(errors.documentAlreadyExists.message);
        expect(response.statusCode).toBe(409);
    });

    it('should return 200 if returns success', async () => {
        const { controller, repository } = makeSut();

        const fakeCustomerEntity = makeFakeCustomerEntity();

        const { id } = await repository.create(fakeCustomerEntity);

        const httpRequest = makeHttpRequest();

        const response = await controller.handle(httpRequest);

        expect(response.body).toEqual({
            ...fakeCustomerEntity,
            name: httpRequest.body.name,
            id,
        });
        expect(response.statusCode).toBe(200);
    });
});
