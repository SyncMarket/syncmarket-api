import { CreateProduct } from '@application/usecases';
import {
    CreateProductRepositoryStub,
    makeFakeProduct,
} from '@test/core/entities';
import { SutTypes } from '@test/types';

const makeSut = (): SutTypes<CreateProduct, CreateProductRepositoryStub> => {
    const repository = new CreateProductRepositoryStub();

    const sut = new CreateProduct(repository);

    return { sut, repository };
};

describe('CreatePost', () => {
    it('should call CreatePostRepository with correct data', async () => {
        const { sut, repository } = makeSut();

        const createPostSpy = jest.spyOn(repository, 'create');

        const product = makeFakeProduct();

        await sut.execute(product);

        expect(createPostSpy).toHaveBeenCalledWith(product);
    });
});
