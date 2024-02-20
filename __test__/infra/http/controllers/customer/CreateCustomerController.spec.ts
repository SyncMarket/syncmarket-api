import { CreateCustomerInterface } from '@application/interfaces';
import { CreateCustomerController } from '@infra/http/controllers';
import { AuthStub, CreateCustomerStub } from '@test/application';
import { InMemoryCustomerRepository } from '@test/application/repositories';
import { makeFakeCustomerDTO } from '@test/core/entities';

type SutType = {
    controller: CreateCustomerController;
    createCustomerStub: CreateCustomerInterface;
};

describe('CreateCustomerController', () => {
    const makeSut = (): SutType => {
        const inMemoryCustomerRepository = new InMemoryCustomerRepository();
        const authStub = new AuthStub();

        const createCustomerStub = new CreateCustomerStub(
            inMemoryCustomerRepository,
            inMemoryCustomerRepository,
            inMemoryCustomerRepository,
            authStub,
        );

        const controller = new CreateCustomerController(createCustomerStub);

        return { controller, createCustomerStub };
    };

    it('should call CreateCustomer with correct data', async () => {
        const { controller, createCustomerStub } = makeSut();

        const executeSpy = jest.spyOn(createCustomerStub, 'execute');

        const httpRequest = {
            body: makeFakeCustomerDTO(),
        };

        await controller.handle(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
    });
});
