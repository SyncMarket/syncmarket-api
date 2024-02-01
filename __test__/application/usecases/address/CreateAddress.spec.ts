import { CreateAddress } from '@application/usecases';
import { CreateAddressInterface } from '@application/interfaces';
import { AddressRepository } from '@application/repositories';
import { InMemoryAddressRepository } from '@test/application/repositories';
import { makeFakeAddressDTO, makeFakeAddressEntity } from '@test/core/entities';

describe('CreateAddress', () => {
    type SutTypes = {
        usecase: CreateAddressInterface;
        repository: AddressRepository;
    };

    const makeSut = (): SutTypes => {
        const repository = new InMemoryAddressRepository();
        const usecase = new CreateAddress(repository);

        return { usecase, repository };
    };

    it('should call CreateAddressRepository with correct data', async () => {
        const { usecase, repository } = makeSut();

        const createSpy = jest.spyOn(repository, 'create');
        const fakeAddressDTO = makeFakeAddressDTO();
        const fakeAddressEntity = makeFakeAddressEntity();

        const request: CreateAddressInterface.Request = {
            addressDTO: fakeAddressDTO,
            customerId: 'customerId',
        };
        const response = await usecase.execute(request);

        expect(response.isRight()).toBeTruthy();
        expect(createSpy).toHaveBeenCalledWith(fakeAddressEntity);
    });
});
