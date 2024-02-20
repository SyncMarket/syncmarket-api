import { AddressControllerStub } from '@test/infra/http';

describe('GetAddressByIdController', () => {
    const { controller, usecase } = AddressControllerStub.getById();

    it('should call GetAddressById with correct data', async () => {
        const executeSpy = jest.spyOn(usecase, 'execute');

        const httpRequest = {
            params: {
                id: 'addressId',
            },
        };

        await controller.handle(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.id);
    });
});
