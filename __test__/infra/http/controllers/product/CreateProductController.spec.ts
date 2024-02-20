import { HttpRequest } from '@infra/http/interfaces';
import { CreateProductStub } from '@test/application';
import { makeFakeProduct } from '@test/core/entities';
import { CreateProductController } from '@infra/http/controllers';

type SutTypes = {
    createProductController: CreateProductController;
    createProductStub: CreateProductStub;
};

const makeSut = (): SutTypes => {
    const createProductStub = new CreateProductStub();
    const createProductController = new CreateProductController(
        createProductStub,
    );

    return { createProductController, createProductStub };
};

const makeFakeHttpRequest = (): HttpRequest => {
    const product = makeFakeProduct();

    return { body: product };
};

describe('CreateProductController', () => {
    it('should call CreateProduct with correct data', async () => {
        const { createProductController, createProductStub } = makeSut();

        const executeSpy = jest.spyOn(createProductStub, 'execute');

        const httpRequest = makeFakeHttpRequest();

        await createProductController.handle(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
    });

    it('should return 200 on success', async () => {
        const { createProductController } = makeSut();

        const httpRequest = makeFakeHttpRequest();

        const httpResponse = await createProductController.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(200);
    });
});
