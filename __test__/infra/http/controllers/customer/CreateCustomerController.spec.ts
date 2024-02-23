import { makeFakeCustomerDTO } from '@test/core/entities';
import { CustomerControllerStub } from '../../mocks';

describe('CreateCustomerController', () => {
    const { controller, usecase } = CustomerControllerStub.create();

    it('should call CreateCustomer with correct data', async () => {
        const executeSpy = jest.spyOn(usecase, 'execute');
        const httpRequest = {
            body: makeFakeCustomerDTO(),
        };
        await controller.handle(httpRequest);
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
    });
});
