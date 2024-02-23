import { makeFakeCustomerEntity } from '@test/core/entities';
import { HttpRequest } from '@infra/http/interfaces';
import { CustomerNotFoundError } from '@core/errors';
import { CustomerControllerStub } from '../../mocks';

describe('DeleteCustomerController', () => {
    const { controller, repository, usecase } = CustomerControllerStub.delete();
    const makeHttpRequest = (): HttpRequest<undefined, { id: string }> => {
        return {
            params: {
                id: 'customerId',
            },
        };
    };

    it('should call DeleteCustomerController with correct data', async () => {
        const executeSpy = jest.spyOn(usecase, 'execute');
        const fakeCustomerEntity = makeFakeCustomerEntity();
        await repository.create(fakeCustomerEntity);
        const httpRequest = makeHttpRequest();
        await controller.handle(httpRequest);
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.id);
    });

    it('should return 404 if CustomerNotFoundError', async () => {
        const httpRequest = makeHttpRequest();
        httpRequest.params.id = 'invalid_id';
        const httpResponse = await controller.handle(httpRequest);
        expect(httpResponse.body).toEqual(
            new CustomerNotFoundError('invalid_id').message,
        );
        expect(httpResponse.statusCode).toBe(404);
    });

    it('should return 204 if DeleteCustomer succeeds', async () => {
        const fakeCustomerEntity = makeFakeCustomerEntity();
        await repository.create(fakeCustomerEntity);
        const httpRequest = makeHttpRequest();
        const httpResponse = await controller.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(204);
    });
});
