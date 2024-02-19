import { HttpRequest } from '@infra/http/interfaces';
import { AddressControllerStub } from '@test/infra/http';

describe('GetAddressesController', () => {
    const { controller, usecase } = AddressControllerStub.get();
    const request: HttpRequest = {
        query: {
            page: 1,
            pageSize: 10,
        },
    };

    it('should call getAddresses with correct data', async () => {
        const getAddressesSpy = jest.spyOn(usecase, 'execute');
        await controller.handle(request);
        expect(getAddressesSpy).toHaveBeenCalled();
    });

    it('should return 200 if addresses are found', async () => {
        const response = await controller.handle(request);
        expect(response.statusCode).toBe(200);
    });
});
