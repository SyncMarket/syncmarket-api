import { Collection } from 'mongodb';
import {
    ProductMapperMongoDb,
    ProductModelMongoDb,
    mongoDB,
    objectIdToString,
} from '@infra/database/mongodb';
import {
    CreateProductRepository,
    GetProductBySkuRepository,
} from '@application/interfaces';
import { ProductRepository } from '@application/repositories';
import { ProductEntity } from '@core/entities';

export class ProductRepositoryMongoDb implements ProductRepository {
    private readonly collection: Collection<ProductModelMongoDb>;

    constructor() {
        this.collection = ProductRepositoryMongoDb.getCollection();
    }

    static getCollection(): Collection<ProductModelMongoDb> {
        return mongoDB.getCollection<ProductModelMongoDb>('product');
    }

    async create(
        request: CreateProductRepository.Request,
    ): Promise<CreateProductRepository.Response> {
        const { insertedId } = await this.collection.insertOne(
            ProductMapperMongoDb.toModel(request),
        );

        return { ...request, id: objectIdToString(insertedId) };
    }

    async getBySku(
        sku: GetProductBySkuRepository.Request,
    ): Promise<GetProductBySkuRepository.Response> {
        const productModelMongoDb = await this.collection.findOne({ sku });

        if (!productModelMongoDb) {
            return null;
        }

        return ProductMapperMongoDb.toEntity(productModelMongoDb);
    }

    async getByNbm(nbm: string): Promise<ProductEntity> {
        const productModelMongoDb = await this.collection.findOne({ nbm });

        if (!productModelMongoDb) {
            return null;
        }

        return ProductMapperMongoDb.toEntity(productModelMongoDb);
    }
}
