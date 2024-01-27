import { GetProductStub } from '@test/application';
import { InMemoryProductRepository } from '@test/application/repositories';
import { HttpRequest } from '@infra/http/interfaces';
import { GetProductController } from '@infra/http/controllers';

type SutType = {
    getProductController: GetProductController;
    getProduct: GetProductStub;
};

describe('GetProductController', () => {
    const makeFakeHttpRequest = (): HttpRequest => ({
        query: {
            page: 1,
            pageSize: 10,
        },
    });

    const makeSut = (): SutType => {
        const inMemoryProductRepository = new InMemoryProductRepository();

        const getProduct = new GetProductStub(inMemoryProductRepository);
        const getProductController = new GetProductController(getProduct);

        return {
            getProductController,
            getProduct,
        };
    };

    it('should call GetProduct with correct data', async () => {
        const { getProductController, getProduct } = makeSut();

        const getProductSpy = jest.spyOn(getProduct, 'execute');

        const httpRequest = makeFakeHttpRequest();

        await getProductController.handle(httpRequest);

        expect(getProductSpy).toHaveBeenCalledWith(httpRequest.query);
    });
});
