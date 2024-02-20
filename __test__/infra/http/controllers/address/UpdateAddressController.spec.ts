import { HttpRequest } from '@infra/http/interfaces';
import { AddressControllerStub } from '@test/infra/http';

describe('UpdateAddressController', () => {
    const { controller, usecase } = AddressControllerStub.update();
    const request: HttpRequest = {
        body: {
            id: '1',
            street: 'Rua 1',
            number: 1,
            city: 'City',
            state: 'State',
            country: 'Country',
            zipCode: '00000-000',
        },
        params: {
            id: 'addressId',
        },
    };

    it('should call updateAddress with correct data', async () => {
        const updateAddressSpy = jest.spyOn(usecase, 'execute');
        await controller.handle(request);
        expect(updateAddressSpy).toHaveBeenCalled();
    });
});
