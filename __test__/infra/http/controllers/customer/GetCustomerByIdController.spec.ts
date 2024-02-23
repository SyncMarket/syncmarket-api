import { left } from '@core/either';
import { CustomerNotFoundError } from '@core/errors';
import { notFound } from '@infra/http/helpers';
import { makeFakeCustomerEntity } from '@test/core/entities';
import { CustomerControllerStub } from '../../mocks';
import { Customer } from '@core/interfaces';

describe('GetCustomerByIdController', () => {
    const { controller, repository, usecase } =
        CustomerControllerStub.getById();
    const errors = {
        notFound: new CustomerNotFoundError('invalid_id'),
    };
    const httpRequest = {
        params: {
            id: 'customerId',
        },
    };

    it('should call GetCustomerById with correct data', async () => {
        const executeSpy = jest.spyOn(usecase, 'execute');
        await controller.handle(httpRequest);
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.id);
    });

    it('should return 404 if GetCustomerById returns an error', async () => {
        jest.spyOn(controller, 'handle').mockReturnValueOnce(
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
        jest.spyOn(usecase, 'execute').mockReturnValueOnce(
            Promise.resolve(left(errors.notFound)),
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
        const fakeCustomerEntity = makeFakeCustomerEntity();
        await repository.create(fakeCustomerEntity);
        const httpResponse = await controller.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(200);
    });

    it('should return Customer on success', async () => {
        const fakeCustomerEntity = await repository.create(
            makeFakeCustomerEntity(),
        );
        const httpResponse = await controller.handle(httpRequest);
        const customer: Customer = {
            ...fakeCustomerEntity,
            id: httpRequest.params.id,
            addresses: [],
            cartId: null,
        };
        expect(httpResponse.body).toEqual(customer);
    });
});
