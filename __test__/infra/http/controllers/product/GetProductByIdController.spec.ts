import { left } from '@core/either';
import { ProductNotFoundError } from '@core/errors';
import { GetProductByIdController } from '@infra/http/controllers';
import { HttpRequest } from '@infra/http/interfaces';
import { GetProductByIdStub } from '@test/application';
import { InMemoryProductRepository } from '@test/application/repositories';
import { makeFakeProduct } from '@test/core/entities';

type SutTypes = {
    getProductByIdController: GetProductByIdController;
    getProductByIdStub: GetProductByIdStub;
};

describe('GetProductByIdController', () => {
    const inMemoryProductRepository = new InMemoryProductRepository();

    const makeSut = (): SutTypes => {
        const getProductByIdStub = new GetProductByIdStub(
            inMemoryProductRepository,
        );
        const getProductByIdController = new GetProductByIdController(
            getProductByIdStub,
        );

        return {
            getProductByIdController,
            getProductByIdStub,
        };
    };

    const makeFakeHttpRequest = (): HttpRequest => {
        const { id } = makeFakeProduct();

        return { params: { id } };
    };

    beforeAll(() => {
        inMemoryProductRepository.create(makeFakeProduct());
    });

    it('should call GetProductById with correct params', async () => {
        const { getProductByIdController, getProductByIdStub } = makeSut();

        const getProductByIdSpy = jest.spyOn(getProductByIdStub, 'execute');
        const httpRequest = makeFakeHttpRequest();

        await inMemoryProductRepository.create(makeFakeProduct());
        await getProductByIdController.handle(httpRequest);

        expect(getProductByIdSpy).toHaveBeenCalledWith(httpRequest.params.id);
    });

    it('should return 404 if product not found', async () => {
        const { getProductByIdController, getProductByIdStub } = makeSut();

        jest.spyOn(getProductByIdStub, 'execute').mockImplementation(async () =>
            left(new ProductNotFoundError('invalid_id')),
        );

        const httpRequest = makeFakeHttpRequest();

        httpRequest.params.id = 'id';

        const httpResponse = await getProductByIdController.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(404);
    });

    it('should return 200 on success', async () => {
        const { getProductByIdController } = makeSut();

        const httpRequest = makeFakeHttpRequest();

        const httpResponse = await getProductByIdController.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(200);
    });
});
