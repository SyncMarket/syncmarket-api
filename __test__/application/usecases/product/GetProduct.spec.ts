import { InMemoryProductRepository } from '@test/application/repositories';
import { GetProduct } from '@application/usecases';
import { makeFakeProduct } from '@test/core/entities';

type SutType = {
    getProduct: GetProduct;
    inMemoryProductRepository: InMemoryProductRepository;
};

describe('GetProduct', () => {
    const makeSut = (): SutType => {
        const inMemoryProductRepository = new InMemoryProductRepository();

        const getProduct = new GetProduct(inMemoryProductRepository);

        return {
            getProduct,
            inMemoryProductRepository,
        };
    };

    it('should call GetProductRepository with correct data', async () => {
        const { getProduct, inMemoryProductRepository } = makeSut();

        const getProductSpy = jest.spyOn(inMemoryProductRepository, 'get');

        await inMemoryProductRepository.create(makeFakeProduct());

        await getProduct.execute({
            page: 1,
            pageSize: 10,
        });

        expect(getProductSpy).toHaveBeenCalledWith({
            page: 1,
            pageSize: 10,
        });
    });

    it('should return 2 products', async () => {
        const { getProduct, inMemoryProductRepository } = makeSut();

        await inMemoryProductRepository.create(makeFakeProduct());
        await inMemoryProductRepository.create(makeFakeProduct());
        await inMemoryProductRepository.create(makeFakeProduct());

        const { elements } = await getProduct.execute({
            page: 1,
            pageSize: 2,
        });

        expect(elements).toBe(2);
    });
});
