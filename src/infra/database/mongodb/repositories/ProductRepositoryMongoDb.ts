import { Collection } from 'mongodb';
import {
    ProductMapperMongoDb,
    ProductModelMongoDb,
    mongoDB,
    objectIdToString,
    stringToObjectId,
} from '@infra/database/mongodb';
import {
    CreateProductRepository,
    GetProductByIdRepository,
    GetProductByNbmRepository,
    GetProductBySkuRepository,
    GetProductRepository,
    UpdateProductRepository,
} from '@application/interfaces';
import { ProductRepository } from '@application/repositories';

export class ProductRepositoryMongoDb implements ProductRepository {
    private readonly collection: Collection<ProductModelMongoDb>;

    constructor() {
        this.collection = ProductRepositoryMongoDb.getCollection();
    }

    static getCollection(): Collection<ProductModelMongoDb> {
        return mongoDB.getCollection<ProductModelMongoDb>('product');
    }

    async create(
        data: CreateProductRepository.Request,
    ): Promise<CreateProductRepository.Response> {
        const { insertedId } = await this.collection.insertOne(
            ProductMapperMongoDb.toModel(data),
        );

        return { ...data, id: objectIdToString(insertedId) };
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

    async getByNbm(
        nbm: GetProductByNbmRepository.Request,
    ): Promise<GetProductByNbmRepository.Response> {
        const productModelMongoDb = await this.collection.findOne({ nbm });

        if (!productModelMongoDb) {
            return null;
        }

        return ProductMapperMongoDb.toEntity(productModelMongoDb);
    }

    async getById(
        id: GetProductByIdRepository.Request,
    ): Promise<GetProductByIdRepository.Response> {
        const productModelMongoDb = await this.collection.findOne({
            _id: stringToObjectId(id),
        });

        if (!productModelMongoDb) {
            return null;
        }

        return ProductMapperMongoDb.toEntity(productModelMongoDb);
    }

    async update(
        request: UpdateProductRepository.Request,
    ): Promise<UpdateProductRepository.Response> {
        await this.collection.findOneAndUpdate(
            {
                _id: stringToObjectId(request.id),
            },
            {
                $set: ProductMapperMongoDb.toModel(request),
            },
        );
    }

    async get(
        request: GetProductRepository.Request,
    ): Promise<GetProductRepository.Response> {
        const { page, pageSize, filter } = request;

        const productModelGroup = await this.collection
            .find(filter)
            .skip(page)
            .limit(pageSize)
            .toArray();

        const total = await this.collection.countDocuments(filter);

        const data = productModelGroup.map((productModelMongoDb) =>
            ProductMapperMongoDb.toEntity(productModelMongoDb),
        );

        return { data, total, elements: data.length };
    }
}
