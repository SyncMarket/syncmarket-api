import { GetProductById } from '@application/usecases';
import {
    GetProductByIdRepositoryStub,
    makeFakeProduct,
} from '@test/core/entities';

type SutTypes = {
    getProductById: GetProductById;
    getProductByIdRepositoryStub: GetProductByIdRepositoryStub;
};

const makeSut = (): SutTypes => {
    const getProductByIdRepositoryStub = new GetProductByIdRepositoryStub();

    const getProductById = new GetProductById(getProductByIdRepositoryStub);

    return {
        getProductById,
        getProductByIdRepositoryStub,
    };
};

describe('GetProductById', () => {
    it('should call GetProductByIdRepository with correct data', async () => {
        const { getProductById } = makeSut();

        const fakeProduct = makeFakeProduct();

        const product = await getProductById.execute(fakeProduct.id);

        expect(product.value).toEqual(fakeProduct);
    });
});
