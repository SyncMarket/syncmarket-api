import { GetAddressesInterface } from '@application/interfaces';
import { AddressStub } from '@test/application/mocks';
import { makeFakeAddressEntity } from '@test/core/entities';

describe('GetAddresses', () => {
    it('should call GetAddressesRepository with correct data', async () => {
        const { usecase, repository } = AddressStub.getStub();

        const getAddressesSpy = jest.spyOn(repository, 'get');
        const fakeAddressEntity = makeFakeAddressEntity();

        await repository.create(fakeAddressEntity);

        const request: GetAddressesInterface.Request = {
            page: 1,
            pageSize: 10,
        };
        await usecase.execute(request);

        expect(getAddressesSpy).toHaveBeenCalledWith({
            page: (request.page - 1) * request.pageSize,
            pageSize: request.pageSize,
        });
    });

    it('should return addresses', async () => {
        const { usecase, repository } = AddressStub.getStub();

        const fakeAddressEntity = makeFakeAddressEntity();
        const { id } = await repository.create(fakeAddressEntity);
        const request: GetAddressesInterface.Request = {
            page: 1,
            pageSize: 10,
        };
        const response: GetAddressesInterface.Response = {
            data: [{ ...fakeAddressEntity, id }],
            page: {
                elements: 1,
                totalElements: 1,
                number: 1,
            },
        };
        const addresses = await usecase.execute(request);
        expect(addresses).toEqual(response);
    });
});
