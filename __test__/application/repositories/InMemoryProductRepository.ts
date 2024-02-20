import {
    CreateProductRepository,
    GetProductByIdRepository,
    GetProductByNbmRepository,
    GetProductBySkuRepository,
    GetProductRepository,
    UpdateProductRepository,
} from '@application/interfaces';
import { ProductRepository } from '@application/repositories';
import { ProductEntity } from '@core/entities';
import { Utils } from '@core/utils';

export class InMemoryProductRepository implements ProductRepository {
    public items: ProductEntity[] = [];

    constructor() {
        this.items = [];
    }

    public async create(
        data: CreateProductRepository.Request,
    ): Promise<ProductEntity> {
        const productEntity = new ProductEntity(data);

        this.items.push(productEntity);
        this.items = Utils.sortByProperty(this.items, 'createdAt');

        return productEntity;
    }

    public async getBySku(
        sku: GetProductBySkuRepository.Request,
    ): Promise<GetProductBySkuRepository.Response> {
        return Utils.searchByProperty({
            items: this.items,
            property: 'sku',
            target: sku,
        });
    }

    public async getByNbm(
        nbm: GetProductByNbmRepository.Request,
    ): Promise<GetProductByNbmRepository.Response> {
        return Utils.searchByProperty({
            items: this.items,
            property: 'nbm',
            target: nbm,
        });
    }

    public async update(
        request: UpdateProductRepository.Request,
    ): Promise<UpdateProductRepository.Response> {
        const productIndex = this.items.findIndex(
            (item) => item.id === request.id,
        );

        this.items[productIndex] = request;
    }

    public async getById(
        id: GetProductByIdRepository.Request,
    ): Promise<GetProductByIdRepository.Response> {
        return Utils.searchByProperty({
            items: this.items,
            property: 'id',
            target: id,
        });
    }

    public async get(
        request: GetProductRepository.Request,
    ): Promise<GetProductRepository.Response> {
        const { page, pageSize } = request;

        const data = this.items.slice(page, pageSize);

        return { data: data, total: this.items.length };
    }
}
