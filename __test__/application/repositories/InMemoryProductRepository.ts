import {
    CreateProductRepository,
    GetProductBySkuRepository,
} from '@application/interfaces';
import { ProductRepository } from '@application/repositories';
import { ProductEntity } from '@core/entities';

export class InMemoryProductRepository implements ProductRepository {
    items: ProductEntity[] = [];

    async create(
        productDTO: CreateProductRepository.Request,
    ): Promise<ProductEntity> {
        const productEntity = new ProductEntity(productDTO);

        this.items.push(productEntity);

        return productEntity;
    }

    async getBySku(
        sku: GetProductBySkuRepository.Request,
    ): Promise<GetProductBySkuRepository.Response> {
        const productEntity = this.items.find((item) => item.sku === sku);

        if (!productEntity) {
            return null;
        }

        return productEntity;
    }
}
