import { UpdateAddressInterface } from '@application/interfaces';
import { AddressNotFoundError } from '@core/errors';
import { AddressStub } from '@test/application/mocks';
import { makeFakeAddressEntity } from '@test/core/entities';

describe('UpdateAddress', () => {
    it('should call UpdateAddressRepository with correct data', async () => {
        const { usecase, repository } = AddressStub.updateStub();
        const fakeAddressEntity = makeFakeAddressEntity();
        const { id } = await repository.create(fakeAddressEntity);
        const updateSpy = jest.spyOn(repository, 'update');
        const request: UpdateAddressInterface.Request = {
            data: { city: 'cityUpdated' },
            id: id,
        };
        const response = await usecase.execute(request);
        expect(response.isRight()).toBeTruthy();
        expect(updateSpy).toHaveBeenCalledWith({
            id,
            data: { id, ...fakeAddressEntity, ...request.data },
        });
    });

    it('should return AddressNotFoundError if address doesn`t exist', async () => {
        const { usecase } = AddressStub.updateStub();
        const request: UpdateAddressInterface.Request = {
            data: { city: 'cityUpdated' },
            id: 'invalidId',
        };
        const response = await usecase.execute(request);
        expect(response.isLeft()).toBeTruthy();
        expect(response.value).toEqual(new AddressNotFoundError('invalidId'));
    });

    it('should return updated address', async () => {
        const { usecase, repository } = AddressStub.updateStub();
        const fakeAddressEntity = makeFakeAddressEntity();
        const { id } = await repository.create(fakeAddressEntity);
        const request: UpdateAddressInterface.Request = {
            data: { city: 'cityUpdated' },
            id: id,
        };
        const response = await usecase.execute(request);
        if (response.isRight()) {
            fakeAddressEntity.updatedAt = response.value.updatedAt;
        }
        expect(response.isRight()).toBeTruthy();
        expect(response.value).toEqual({
            id,
            ...fakeAddressEntity,
            ...request.data,
        });
    });
});
