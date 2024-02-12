import { AddressNotFoundError } from '@core/errors';
import { Address } from '@core/interfaces';
import { AddressStub } from '@test/application/mocks';
import { makeFakeAddressEntity } from '@test/core/entities';

describe('GetAddressById', () => {
    const getByIdStub = AddressStub.getByIdStub();

    it('should call GetAddressByIdRepository with correct id', async () => {
        const { usecase, repository } = getByIdStub;

        const fakeAddressEntity = makeFakeAddressEntity();

        const { id } = await repository.create(fakeAddressEntity);

        const getByIdSpy = jest.spyOn(repository, 'getById');

        await usecase.execute({ id });

        expect(getByIdSpy).toHaveBeenCalledWith(id);
    });

    it('should return AddressNotFoundError if address doesn`t exist', async () => {
        const { usecase } = getByIdStub;

        const response = await usecase.execute({ id: 'invalidId' });

        expect(response.isLeft()).toBeTruthy();
        expect(response.value).toEqual(new AddressNotFoundError('invalidId'));
    });

    it('should return address', async () => {
        const { usecase, repository } = getByIdStub;
        const fakeAddressEntity = makeFakeAddressEntity();
        const { id } = await repository.create(fakeAddressEntity);

        const response = await usecase.execute({ id });
        expect(response.isRight()).toBeTruthy();

        const address = response.value as Address;
        fakeAddressEntity.createdAt = address.createdAt;
        expect(response.value).toEqual({ ...fakeAddressEntity, id });
    });
});
