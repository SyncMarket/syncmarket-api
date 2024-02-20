import { makeFakeAddressDTO } from '@test/core/entities';
import { AddressControllerStub } from '@test/infra/http';

describe('CreateAddressController', () => {
    const { controller, usecase } = AddressControllerStub.create();
    const addressDTO = makeFakeAddressDTO();

    it('should call CreateAddress with correct data', async () => {
        const executeSpy = jest.spyOn(usecase, 'execute');

        const httpRequest = {
            body: addressDTO,
        };

        await controller.handle(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
    });
});
