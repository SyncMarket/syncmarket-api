import { UpdateProduct } from '@application/usecases';
import {
    NbmAlreadyExistsError,
    ProductNotFoundError,
    SkuAlreadyExistsError,
} from '@core/errors';
import { InMemoryProductRepository } from '@test/application/repositories';
import { makeFakeProduct } from '@test/core/entities';

type SutTypes = {
    updateProduct: UpdateProduct;
    inMemoryProductRepository: InMemoryProductRepository;
};

const makeSut = (): SutTypes => {
    const inMemoryProductRepository = new InMemoryProductRepository();

    const updateProduct = new UpdateProduct(
        inMemoryProductRepository,
        inMemoryProductRepository,
        inMemoryProductRepository,
        inMemoryProductRepository,
    );

    return {
        updateProduct,
        inMemoryProductRepository,
    };
};

describe('UpdateProduct', () => {
    it('should call UpdateProductRepository with correct data', async () => {
        const { updateProduct, inMemoryProductRepository } = makeSut();

        const updateProductSpy = jest.spyOn(
            inMemoryProductRepository,
            'update',
        );

        const fakeProduct = makeFakeProduct();

        inMemoryProductRepository.create(fakeProduct);

        await updateProduct.execute({
            id: fakeProduct.id,
            data: {
                name: 'Product Updated',
            },
        });

        expect(updateProductSpy).toHaveBeenCalledWith({
            ...fakeProduct,
            name: 'Product Updated',
        });
    });

    it('should return SkuAlreadyExistsError if sku already exists', async () => {
        const { updateProduct, inMemoryProductRepository } = makeSut();

        const fakeProduct = makeFakeProduct();

        inMemoryProductRepository.create(fakeProduct);

        const product = await updateProduct.execute({
            id: fakeProduct.id,
            data: {
                sku: fakeProduct.sku,
            },
        });

        expect(product.value).toEqual(
            new SkuAlreadyExistsError(fakeProduct.sku),
        );
    });

    it('should return NbmAlreadyExistsError if nbm already exists', async () => {
        const { updateProduct, inMemoryProductRepository } = makeSut();

        const fakeProduct = makeFakeProduct();

        inMemoryProductRepository.create(fakeProduct);

        const product = await updateProduct.execute({
            id: fakeProduct.id,
            data: {
                nbm: fakeProduct.nbm,
            },
        });

        expect(product.value).toEqual(
            new NbmAlreadyExistsError(fakeProduct.nbm),
        );
    });

    it('should return ProductNotFoundError if product not found', async () => {
        const { updateProduct } = makeSut();

        const product = await updateProduct.execute({
            id: 'id-not-found',
            data: {
                name: 'Product Updated',
            },
        });

        expect(product.value).toEqual(new ProductNotFoundError('id-not-found'));
    });

    it('should return Product with updated data', async () => {
        const { updateProduct, inMemoryProductRepository } = makeSut();

        const fakeProduct = makeFakeProduct();

        inMemoryProductRepository.create(fakeProduct);

        const product = await updateProduct.execute({
            id: fakeProduct.id,
            data: {
                name: 'Product Updated',
            },
        });

        expect(product.value).toEqual({
            ...fakeProduct,
            name: 'Product Updated',
        });
    });
});
