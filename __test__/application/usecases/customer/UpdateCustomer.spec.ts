import { InMemoryCustomerRepository } from '@test/application/repositories';
import { UpdateCustomer } from '@application/usecases';
import { makeFakeCustomerEntity } from '@test/core/entities';
import {
    CustomerNotFoundError,
    DocumentAlreadyExistsError,
    EmailAlreadyExistsError,
} from '@core/errors';

describe('UpdateCustomer', () => {
    type SutTypes = {
        usecase: UpdateCustomer;
        repository: InMemoryCustomerRepository;
    };

    const errors = {
        customerNotFound: new CustomerNotFoundError('fakeId'),
        emailAlreadyExists: new EmailAlreadyExistsError('email'),
        documentAlreadyExists: new DocumentAlreadyExistsError('document'),
    };

    const makeSut = (): SutTypes => {
        const repository = new InMemoryCustomerRepository();
        const usecase = new UpdateCustomer(
            repository,
            repository,
            repository,
            repository,
        );

        return {
            usecase,
            repository,
        };
    };

    it('should call UpdateCustomerRepository with correct data', async () => {
        const { repository, usecase } = makeSut();

        const updateSpy = jest.spyOn(repository, 'update');

        const fakeCustomerEntity = makeFakeCustomerEntity();

        const { id } = await repository.create(fakeCustomerEntity);

        await usecase.execute({ id, data: { name: 'new name' } });

        const updateRequest = {
            ...fakeCustomerEntity,
            name: 'new name',
            id,
        };

        expect(updateSpy).toHaveBeenCalledWith({
            id,
            data: updateRequest,
        });
    });

    it('should return CustomerNotFoundError if customer does not exists', async () => {
        const { usecase } = makeSut();

        const fakeId = 'fakeId';

        const result = await usecase.execute({
            id: fakeId,
            data: makeFakeCustomerEntity(),
        });

        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toEqual(errors.customerNotFound);
    });

    it('should return EmailAlreadyExistsError if email already exists', async () => {
        const { usecase, repository } = makeSut();

        const fakeCustomerEntity = makeFakeCustomerEntity();

        const { id } = await repository.create(fakeCustomerEntity);

        await repository.create(fakeCustomerEntity);

        const result = await usecase.execute({
            id,
            data: { email: fakeCustomerEntity.email },
        });

        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toEqual(errors.emailAlreadyExists);
    });

    it('should return DocumentAlreadyExistsError if document already exists', async () => {
        const { usecase, repository } = makeSut();

        const fakeCustomerEntity = makeFakeCustomerEntity();

        const { id } = await repository.create(fakeCustomerEntity);

        await repository.create(fakeCustomerEntity);

        const result = await usecase.execute({
            id,
            data: { document: fakeCustomerEntity.document },
        });

        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toEqual(errors.documentAlreadyExists);
    });

    it('should return customer if customer was updated', async () => {
        const { usecase, repository } = makeSut();

        const fakeCustomerEntity = makeFakeCustomerEntity();

        const { id } = await repository.create(fakeCustomerEntity);

        const result = await usecase.execute({
            id,
            data: { name: 'new name' },
        });

        expect(result.isRight()).toBeTruthy();
        expect(result.value).toEqual({
            ...fakeCustomerEntity,
            name: 'new name',
            id,
        });
    });
});
