import { CustomerEntity } from '@core/entities';
import {
    CustomerModelMongoDb,
    objectIdToString,
    stringToObjectId,
} from '@infra/database/mongodb';
import { WithId } from 'mongodb';

export class CustomerMapperMongoDb {
    static toEntity(model: WithId<CustomerModelMongoDb>): CustomerEntity {
        return {
            id: objectIdToString(model._id),
            addressId: objectIdToString(model.addressId),
            birthDate: model.birthDate,
            cartId: model.cartId ? objectIdToString(model.cartId) : null,
            document: model.document,
            email: model.email,
            name: model.name,
            phoneNumber: model.phoneNumber,
            isActive: model.isActive,
            isDeleted: model.isDeleted,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            deletedAt: model.deletedAt,
        };
    }

    static toModel(
        entity: CustomerEntity | Omit<CustomerEntity, 'id'>,
    ): CustomerModelMongoDb {
        return {
            addressId: stringToObjectId(entity.addressId),
            birthDate: entity.birthDate,
            cartId: entity.cartId ? stringToObjectId(entity.cartId) : null,
            document: entity.document,
            email: entity.email,
            name: entity.name,
            phoneNumber: entity.phoneNumber,
            isActive: entity.isActive,
            isDeleted: entity.isDeleted,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt,
        };
    }
}
