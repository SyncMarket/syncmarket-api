import { CreateProduct } from '@application/usecases';
import {
    CreateProductRepositoryStub,
    makeFakeProduct,
} from '@test/core/entities';

type SutTypes = {
    createProduct: CreateProduct;
    createProductRepositoryStub: CreateProductRepositoryStub;
};

const makeSut = (): SutTypes => {
    const createProductRepositoryStub = new CreateProductRepositoryStub();

    const createProduct = new CreateProduct(createProductRepositoryStub);

    return {
        createProduct,
        createProductRepositoryStub: createProductRepositoryStub,
    };
};

describe('CreatePost', () => {
    it('should call CreatePostRepository with correct data', async () => {
        const { createProduct, createProductRepositoryStub } = makeSut();

        const createPostSpy = jest.spyOn(createProductRepositoryStub, 'create');

        const product = makeFakeProduct();

        await createProduct.execute(product);

        expect(createPostSpy).toHaveBeenCalledWith(product);
    });
});
