import { InMemoryCustomerRepository } from '@test/application/repositories';
import { makeFakeCustomerEntity } from '@test/core/entities';
import { CreateCustomer } from '@application/usecases';
import {
    DocumentAlreadyExistsError,
    EmailAlreadyExistsError,
} from '@core/errors';

describe('CreateCustomer', () => {
    type SutTypes = {
        createCustomer: CreateCustomer;
        inMemoryCustomerRepository: InMemoryCustomerRepository;
    };

    const makeSut = (): SutTypes => {
        const inMemoryCustomerRepository = new InMemoryCustomerRepository();

        const createCustomer = new CreateCustomer(
            inMemoryCustomerRepository,
            inMemoryCustomerRepository,
            inMemoryCustomerRepository,
        );

        return {
            createCustomer,
            inMemoryCustomerRepository,
        };
    };

    it('should call CreateCustomerRepository with correct data', async () => {
        const { createCustomer, inMemoryCustomerRepository } = makeSut();

        const createCustomerSpy = jest.spyOn(
            inMemoryCustomerRepository,
            'create',
        );

        const fakeCustomerEntity = makeFakeCustomerEntity();

        const customer = await createCustomer.execute(fakeCustomerEntity);

        expect(createCustomerSpy).toHaveBeenCalledWith(customer.value);
    });

    it('should return EmailAlreadyExistsError if email already exists', async () => {
        const { createCustomer } = makeSut();

        const fakeCustomerEntity = makeFakeCustomerEntity();

        await createCustomer.execute(fakeCustomerEntity);

        const customer = await createCustomer.execute(fakeCustomerEntity);

        expect(customer.value).toEqual(
            new EmailAlreadyExistsError(fakeCustomerEntity.email),
        );
    });

    it('should return DocumentAlreadyExistsError if document already exists', async () => {
        const { createCustomer } = makeSut();

        const fakeCustomerEntity = makeFakeCustomerEntity();

        await createCustomer.execute(fakeCustomerEntity);

        fakeCustomerEntity.email = 'email2@mail.com';

        const customer = await createCustomer.execute(fakeCustomerEntity);

        expect(customer.value).toEqual(
            new DocumentAlreadyExistsError(fakeCustomerEntity.document),
        );
    });

    it('should return CustomerEntity if success', async () => {
        const { createCustomer } = makeSut();

        const fakeCustomerEntity = makeFakeCustomerEntity();

        const customer = await createCustomer.execute(fakeCustomerEntity);

        expect(customer.value).toEqual(fakeCustomerEntity);
    });
});
