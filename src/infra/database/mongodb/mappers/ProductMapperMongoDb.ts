import { ProductEntity } from '@core/entities';
import {
    ProductModelMongoDb,
    objectIdToString,
    stringToObjectId,
} from '@infra/database/mongodb';
import { WithId } from 'mongodb';

export class ProductMapperMongoDb {
    static toModel(
        entity: ProductEntity | Omit<ProductEntity, 'id'>,
    ): ProductModelMongoDb {
        return {
            brandId: stringToObjectId(entity.brandId),
            categoryId: stringToObjectId(entity.categoryId),
            campaignId: entity.campaignId.map((campaign) => ({
                _id: stringToObjectId(campaign.id),
            })),
            createdAt: entity.createdAt,
            deletedAt: entity.deletedAt ?? null,
            updatedAt: entity.updatedAt ?? null,
            height: entity.height,
            images: entity.images,
            isActive: entity.isActive,
            isAvailable: entity.isAvailable,
            isDeleted: entity.isDeleted,
            length: entity.length,
            name: entity.name,
            nbm: entity.nbm,
            price: entity.price,
            sku: entity.sku,
            stock: entity.stock,
            warranty: {
                text: entity.warranty.text,
                time: entity.warranty.time,
            },
            weight: entity.weight,
            width: entity.width,
        };
    }

    static toEntity(model: WithId<ProductModelMongoDb>): ProductEntity {
        return {
            brandId: objectIdToString(model.brandId),
            categoryId: objectIdToString(model.categoryId),
            campaignId: model.campaignId.map((campaign) => ({
                id: objectIdToString(campaign._id),
            })),
            createdAt: model.createdAt,
            deletedAt: model.deletedAt ?? null,
            updatedAt: model.updatedAt ?? null,
            height: model.height,
            images: model.images,
            isActive: model.isActive,
            isAvailable: model.isAvailable,
            isDeleted: model.isDeleted,
            length: model.length,
            name: model.name,
            nbm: model.nbm,
            price: model.price,
            sku: model.sku,
            stock: model.stock,
            warranty: {
                text: model.warranty.text,
                time: model.warranty.time,
            },
            weight: model.weight,
            width: model.width,
            id: objectIdToString(model._id),
        };
    }
}
