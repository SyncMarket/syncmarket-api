import { HttpRequest } from '@infra/http/interfaces';
import { GetProductByIdStub, UpdateProductStub } from '@test/application';
import { makeFakeProduct } from '@test/core/entities';
import { UpdateProductController } from '@infra/http/controllers';

type SutTypes = {
    updateProductController: UpdateProductController;
    updateProductStub: UpdateProductStub;
    getProductByIdStub: GetProductByIdStub;
};

const makeSut = (): SutTypes => {
    const updateProductStub = new UpdateProductStub();
    const updateProductController = new UpdateProductController(
        updateProductStub,
    );
    const getProductByIdStub = new GetProductByIdStub();

    return { updateProductController, updateProductStub, getProductByIdStub };
};

const makeFakeHttpRequest = (): HttpRequest => {
    const product = makeFakeProduct();

    return { body: product, params: { id: product.id } };
};

describe('UpdateProductController', () => {
    it('should call UpdateProduct with correct data', async () => {
        const { updateProductController, updateProductStub } = makeSut();

        const executeSpy = jest.spyOn(updateProductStub, 'execute');

        const httpRequest = makeFakeHttpRequest();

        await updateProductController.handle(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith({
            id: httpRequest.params.id,
            data: httpRequest.body,
        });
    });

    it('should return 200 on success', async () => {
        const { updateProductController } = makeSut();

        const httpRequest = makeFakeHttpRequest();

        const httpResponse = await updateProductController.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(200);
    });
});
