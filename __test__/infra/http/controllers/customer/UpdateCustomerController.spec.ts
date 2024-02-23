import { makeFakeCustomerEntity } from '@test/core/entities';
import { HttpRequest } from '@infra/http/interfaces';
import { Customer, CustomerDTO } from '@core/interfaces';
import {
    CustomerNotFoundError,
    DocumentAlreadyExistsError,
    EmailAlreadyExistsError,
} from '@core/errors';
import { CustomerControllerStub } from '../../mocks';

describe('UpdateCustomerController', () => {
    const { controller, repository, usecase } = CustomerControllerStub.update();
    const errors = {
        notFound: new CustomerNotFoundError('invalid_id'),
        emailAlreadyExists: new EmailAlreadyExistsError('email'),
        documentAlreadyExists: new DocumentAlreadyExistsError('document'),
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
        const executeSpy = jest.spyOn(usecase, 'execute');
        const fakeCustomerEntity = makeFakeCustomerEntity();
        const { id } = await repository.create(fakeCustomerEntity);
        const httpRequest = makeHttpRequest();
        await controller.handle(httpRequest);
        expect(executeSpy).toHaveBeenCalledWith({ id, data: httpRequest.body });
    });

    it('should return 404 if returns CustomerNotFoundError', async () => {
        const httpRequest = makeHttpRequest();
        httpRequest.params.id = 'invalid_id';
        const response = await controller.handle(httpRequest);
        expect(response.body).toEqual(errors.notFound.message);
        expect(response.statusCode).toBe(404);
    });

    it('should return 409 if returns EmailAlreadyExistsError', async () => {
        const fakeCustomerEntity = makeFakeCustomerEntity();
        await repository.create(fakeCustomerEntity);
        const httpRequest = makeHttpRequest();
        httpRequest.body.email = fakeCustomerEntity.email;
        const response = await controller.handle(httpRequest);
        expect(response.body).toEqual(errors.emailAlreadyExists.message);
        expect(response.statusCode).toBe(409);
    });

    it('should return 409 if returns DocumentAlreadyExistsError', async () => {
        const fakeCustomerEntity = makeFakeCustomerEntity();
        await repository.create(fakeCustomerEntity);
        const httpRequest = makeHttpRequest();
        httpRequest.body.document = fakeCustomerEntity.document;
        const response = await controller.handle(httpRequest);
        expect(response.body).toEqual(errors.documentAlreadyExists.message);
        expect(response.statusCode).toBe(409);
    });

    it('should return 200 if returns success', async () => {
        const fakeCustomerEntity = makeFakeCustomerEntity();
        const { id } = await repository.create(fakeCustomerEntity);
        const httpRequest = makeHttpRequest();
        const response = await controller.handle(httpRequest);
        const customer: Customer = {
            ...fakeCustomerEntity,
            id: id,
            name: httpRequest.body.name,
            addresses: [],
            cartId: null,
        };
        expect(response.body).toEqual(customer);
        expect(response.statusCode).toBe(200);
    });
});
