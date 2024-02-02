import { InMemoryCustomerRepository } from '@test/application/repositories';
import {
    makeFakeCustomerDTO,
    makeFakeCustomerEntity,
} from '@test/core/entities';
import { CreateCustomer } from '@application/usecases';
import {
    DocumentAlreadyExistsError,
    EmailAlreadyExistsError,
} from '@core/errors';
import { AuthStub } from '@test/application/mocks';

describe('CreateCustomer', () => {
    type SutTypes = {
        usecase: CreateCustomer;
        repository: InMemoryCustomerRepository;
    };

    const makeSut = (): SutTypes => {
        const repository = new InMemoryCustomerRepository();
        const authStub = new AuthStub();

        const usecase = new CreateCustomer(
            repository,
            repository,
            repository,
            authStub,
        );

        return {
            usecase,
            repository,
        };
    };

    it('should call CreateCustomerRepository with correct data', async () => {
        const { usecase, repository } = makeSut();

        const createCustomerSpy = jest.spyOn(repository, 'create');

        const fakeCustomerDTO = makeFakeCustomerDTO();
        const fakeCustomerEntity = makeFakeCustomerEntity();

        const customerEntity = await usecase.execute(fakeCustomerDTO);

        expect(customerEntity.isRight()).toBeTruthy();

        if (customerEntity.isRight()) {
            fakeCustomerEntity.createdAt = customerEntity.value.createdAt;
        }

        expect(createCustomerSpy).toHaveBeenCalledWith(fakeCustomerEntity);
    });

    it('should return EmailAlreadyExistsError if email already exists', async () => {
        const { usecase } = makeSut();

        const fakeCustomerDTO = makeFakeCustomerDTO();

        await usecase.execute(fakeCustomerDTO);

        const customer = await usecase.execute(fakeCustomerDTO);

        expect(customer.isLeft).toBeTruthy();
        expect(customer.value).toEqual(
            new EmailAlreadyExistsError(fakeCustomerDTO.email),
        );
    });

    it('should return DocumentAlreadyExistsError if document already exists', async () => {
        const { usecase } = makeSut();

        const fakeCustomerDTO = makeFakeCustomerDTO();

        await usecase.execute(fakeCustomerDTO);

        fakeCustomerDTO.email = 'email2@mail.com';

        const customer = await usecase.execute(fakeCustomerDTO);

        expect(customer.isLeft).toBeTruthy();
        expect(customer.value).toEqual(
            new DocumentAlreadyExistsError(fakeCustomerDTO.document),
        );
    });

    it('should return CustomerEntity if success', async () => {
        const { usecase } = makeSut();

        const fakeCustomerDTO = makeFakeCustomerDTO();
        const fakeCustomerEntity = makeFakeCustomerEntity();

        const customer = await usecase.execute(fakeCustomerDTO);
        expect(customer.isRight()).toBeTruthy();

        fakeCustomerEntity.createdAt = new Date(0);
        const customerEntity = { ...fakeCustomerEntity, id: 'customerId' };
        const customerExpect = { ...customer.value, createdAt: new Date(0) };

        expect(customerExpect).toEqual(customerEntity);
    });
});
