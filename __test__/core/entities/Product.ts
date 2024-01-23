import { ProductDTO } from '@core/interfaces';
import { ProductEntity } from '@core/entities';
import { CreateProductRepository } from '@application/interfaces';

export const makeFakeProduct = (): ProductEntity => {
    const productDTO: ProductDTO = {
        brandId: 'brandId',
        name: 'name',
        price: 10,
        stock: 10,
        campaignId: [
            {
                id: 'id',
            },
        ],
        categoryId: 'categoryId',
        images: [
            {
                alt: 'alt',
                url: 'url',
                isMain: true,
            },
        ],
        height: 10,
        length: 10,
        width: 10,
        nbm: 'nbm',
        sku: 'sku',
        warranty: {
            text: 'text',
            time: new Date(),
        },
        weight: 10,
    };

    return new ProductEntity(productDTO, 'id');
};

export class CreateProductRepositoryStub implements CreateProductRepository {
    async create(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        request: CreateProductRepository.Request,
    ): Promise<ProductEntity> {
        const product = makeFakeProduct();

        return product;
    }
}
