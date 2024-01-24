import { GetProductByIdController } from '@infra/http/controllers';
import { HttpRequest } from '@infra/http/interfaces';
import { GetProductByIdStub } from '@test/application';
import { makeFakeProduct } from '@test/core/entities';

type SutTypes = {
    getProductByIdController: GetProductByIdController;
    getProductByIdStub: GetProductByIdStub;
};

const makeSut = (): SutTypes => {
    const getProductByIdStub = new GetProductByIdStub();
    const getProductByIdController = new GetProductByIdController(
        getProductByIdStub,
    );

    return { getProductByIdController, getProductByIdStub };
};

const makeFakeHttpRequest = (): HttpRequest => {
    const { id } = makeFakeProduct();

    return { params: { id } };
};

describe('GetProductByIdController', () => {
    it('should call GetPostById with correct params', async () => {
        const { getProductByIdController, getProductByIdStub } = makeSut();
        const getPostByIdSpy = jest.spyOn(getProductByIdStub, 'execute');
        const httpRequest = makeFakeHttpRequest();

        await getProductByIdController.handle(httpRequest);

        expect(getPostByIdSpy).toHaveBeenCalledWith(httpRequest.params.id);
    });

    it('should return 200 on success', async () => {
        const { getProductByIdController } = makeSut();

        const httpRequest = makeFakeHttpRequest();

        const httpResponse = await getProductByIdController.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(200);
    });
});
