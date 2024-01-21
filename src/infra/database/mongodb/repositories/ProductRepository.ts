import { Collection } from 'mongodb';
import {
    ProductMapper,
    ProductModel,
    mongoDB,
    objectIdToString,
} from '@infra/database/mongodb';
import { CreateProductRepository } from '@application/interfaces/repositories';

export class ProductRepository implements CreateProductRepository {
    private readonly collection: Collection<ProductModel>;

    constructor() {
        this.collection = mongoDB.getCollection<ProductModel>('product');
    }

    async create(
        request: CreateProductRepository.Request,
    ): Promise<CreateProductRepository.Response> {
        const { insertedId } = await this.collection.insertOne(
            ProductMapper.toModel(request),
        );

        return { ...request, id: objectIdToString(insertedId) };
    }
}
