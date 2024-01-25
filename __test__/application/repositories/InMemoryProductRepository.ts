import {
    CreateProductRepository,
    GetProductByIdRepository,
    GetProductByNbmRepository,
    GetProductBySkuRepository,
    UpdateProductRepository,
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

    async getByNbm(
        nbm: GetProductByNbmRepository.Request,
    ): Promise<GetProductByNbmRepository.Response> {
        const productEntity = this.items.find((item) => item.nbm === nbm);

        if (!productEntity) {
            return null;
        }

        return productEntity;
    }

    async update(
        request: UpdateProductRepository.Request,
    ): Promise<UpdateProductRepository.Response> {
        const productIndex = this.items.findIndex(
            (item) => item.id === request.id,
        );

        this.items[productIndex] = request;
    }

    async getById(
        id: GetProductByIdRepository.Request,
    ): Promise<GetProductByIdRepository.Response> {
        const productEntity = this.items.find((item) => item.id === id);

        if (!productEntity) {
            return null;
        }

        return productEntity;
    }
}
