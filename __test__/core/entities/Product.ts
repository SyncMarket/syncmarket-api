import { ProductDTO } from '@core/interfaces';
import { ProductEntity } from '@core/entities';
import {
    CreateProductRepository,
    GetProductByIdRepository,
} from '@application/interfaces';

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

/* eslint-disable @typescript-eslint/no-unused-vars */
export class CreateProductRepositoryStub implements CreateProductRepository {
    async create(
        request: CreateProductRepository.Request,
    ): Promise<ProductEntity> {
        const product = makeFakeProduct();

        return product;
    }
}

export class GetProductByIdRepositoryStub implements GetProductByIdRepository {
    async getById(id: string): Promise<GetProductByIdRepository.Response> {
        const product = makeFakeProduct();

        return product;
    }
}
