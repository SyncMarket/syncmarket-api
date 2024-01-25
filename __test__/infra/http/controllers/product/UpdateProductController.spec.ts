import { HttpRequest } from '@infra/http/interfaces';
import { GetProductByIdStub, UpdateProductStub } from '@test/application';
import { makeFakeProduct } from '@test/core/entities';
import { UpdateProductController } from '@infra/http/controllers';
import {
    NbmAlreadyExistsError,
    ProductNotFoundError,
    SkuAlreadyExistsError,
} from '@core/errors';
import { left } from '@core/either';
import { conflict, notFound } from '@infra/http/helpers';
import { InMemoryProductRepository } from '@test/application/repositories';
import { Product } from '@core/interfaces';

type SutTypes = {
    updateProductController: UpdateProductController;
    updateProductStub: UpdateProductStub;
    getProductByIdStub: GetProductByIdStub;
    inMemoryProductRepository: InMemoryProductRepository;
};

const error = {
    notFound: left<ProductNotFoundError, Product>(
        new ProductNotFoundError('invalid_id'),
    ),
    conflictSku: left<ProductNotFoundError, Product>(
        new SkuAlreadyExistsError('sku'),
    ),
    conflictNbm: left<ProductNotFoundError, Product>(
        new NbmAlreadyExistsError('nbm'),
    ),
};

const makeSut = (): SutTypes => {
    const inMemoryProductRepository = new InMemoryProductRepository();

    const updateProductStub = new UpdateProductStub(
        inMemoryProductRepository,
        inMemoryProductRepository,
        inMemoryProductRepository,
        inMemoryProductRepository,
    );
    const updateProductController = new UpdateProductController(
        updateProductStub,
    );
    const getProductByIdStub = new GetProductByIdStub();

    return {
        updateProductController,
        updateProductStub,
        getProductByIdStub,
        inMemoryProductRepository,
    };
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

    it('should return 404 if UpdateProduct returns a ProductNotFoundError', async () => {
        const { updateProductController, getProductByIdStub } = makeSut();

        jest.spyOn(getProductByIdStub, 'execute').mockImplementation(
            async () => error.notFound,
        );

        const httpRequest = makeFakeHttpRequest();
        httpRequest.params.id = 'invalid_id';
        const httpResponse = await updateProductController.handle(httpRequest);

        expect(httpResponse).toEqual(notFound(error.notFound));
    });

    it('should return 409 if UpdateProduct returns a SkuAlreadyExistsError', async () => {
        const { updateProductController, updateProductStub } = makeSut();

        jest.spyOn(updateProductStub, 'execute').mockImplementation(
            async () => error.conflictSku,
        );

        const httpRequest = makeFakeHttpRequest();
        const httpResponse = await updateProductController.handle(httpRequest);

        expect(httpResponse).toEqual(conflict(error.conflictSku));
    });

    it('should return 409 if UpdateProduct returns a NbmAlreadyExistsError', async () => {
        const { updateProductController, updateProductStub } = makeSut();

        jest.spyOn(updateProductStub, 'execute').mockImplementation(
            async () => error.conflictNbm,
        );

        const httpRequest = makeFakeHttpRequest();
        const httpResponse = await updateProductController.handle(httpRequest);

        expect(httpResponse).toEqual(conflict(error.conflictNbm));
    });

    it('should return 200 on success', async () => {
        const { updateProductController, inMemoryProductRepository } =
            makeSut();

        const httpRequest = makeFakeHttpRequest();

        await inMemoryProductRepository.create(httpRequest.body);

        httpRequest.body.sku = 'sku1';
        httpRequest.body.nbm = 'nbm1';
        const httpResponse = await updateProductController.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(200);
    });
});
