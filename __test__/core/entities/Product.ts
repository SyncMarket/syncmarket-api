import { ProductDTO } from '@core/interfaces';
import { ProductEntity } from '@core/entities';
import {
    CreateProductRepository,
    GetProductByIdRepository,
    GetProductBySkuRepository,
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
            time: new Date(0),
        },
        weight: 10,
    };

    const productEntity = new ProductEntity(productDTO);

    productEntity.isActive = true;
    productEntity.isAvailable = true;
    productEntity.isDeleted = false;
    productEntity.createdAt = new Date(0);
    productEntity.updatedAt = null;
    productEntity.deletedAt = null;

    return { ...productEntity, id: 'id' };
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

export class GetProductBySkuRepositoryStub
    implements GetProductBySkuRepository
{
    async getBySku(sku: string): Promise<GetProductBySkuRepository.Response> {
        const product = makeFakeProduct();

        return product;
    }
}
