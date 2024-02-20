import {
    GetProductBySkuRepositoryStub,
    makeFakeProduct,
} from '@test/core/entities';
import { GetProductBySku } from '@application/usecases';

type SutTypes = {
    getProductBySku: GetProductBySku;
    getProductBySkuRepositoryStub: GetProductBySkuRepositoryStub;
};

const makeSut = (): SutTypes => {
    const getProductBySkuRepositoryStub = new GetProductBySkuRepositoryStub();

    const getProductBySku = new GetProductBySku(getProductBySkuRepositoryStub);

    return {
        getProductBySku,
        getProductBySkuRepositoryStub,
    };
};

describe('GetProductBySku', () => {
    it('should call GetProductBySkuReposit with correct sku', async () => {
        const { getProductBySku, getProductBySkuRepositoryStub } = makeSut();

        const getProductBySkuSpy = jest.spyOn(
            getProductBySkuRepositoryStub,
            'getBySku',
        );

        const { sku } = makeFakeProduct();

        await getProductBySku.execute(sku);

        expect(getProductBySkuSpy).toHaveBeenCalledWith(sku);
    });
});
