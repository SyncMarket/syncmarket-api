import { CreateProduct } from '@application/usecases';
import { NbmAlreadyExistsError, SkuAlreadyExistsError } from '@core/errors';
import { InMemoryProductRepository } from '@test/application/repositories';
import { makeFakeProduct } from '@test/core/entities';

type SutTypes = {
    createProduct: CreateProduct;
    inMemoryProductRepository: InMemoryProductRepository;
};

const makeSut = (): SutTypes => {
    const inMemoryProductRepository = new InMemoryProductRepository();

    const createProduct = new CreateProduct(
        inMemoryProductRepository,
        inMemoryProductRepository,
        inMemoryProductRepository,
    );

    return {
        createProduct,
        inMemoryProductRepository,
    };
};

describe('CreateProduct', () => {
    it('should call CreateProductRepository with correct data', async () => {
        const { createProduct, inMemoryProductRepository } = makeSut();

        const createProductSpy = jest.spyOn(
            inMemoryProductRepository,
            'create',
        );

        const fakeProduct = makeFakeProduct();

        const product = await createProduct.execute(fakeProduct);

        expect(createProductSpy).toHaveBeenCalledWith(product.value);
    });

    it('should return SkuAlreadyExistsError if sku already exists', async () => {
        const { createProduct } = makeSut();

        const fakeProduct = makeFakeProduct();

        await createProduct.execute(fakeProduct);

        const product = await createProduct.execute(fakeProduct);

        expect(product.value).toEqual(
            new SkuAlreadyExistsError(fakeProduct.sku),
        );
    });

    it('should return NbmAlreadyExistsError if nbm already exists', async () => {
        const { createProduct } = makeSut();

        const fakeProduct = makeFakeProduct();

        await createProduct.execute({ ...fakeProduct, sku: 'sku2' });

        const product = await createProduct.execute(fakeProduct);

        expect(product.value).toEqual(
            new NbmAlreadyExistsError(fakeProduct.nbm),
        );
    });
});
