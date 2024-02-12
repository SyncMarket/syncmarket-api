import { AddressEntity } from '@core/entities';
import { AddressModelMongoDb, objectIdToString } from '@infra/database/mongodb';
import { WithId } from 'mongodb';

export class AddressMapperMongoDb {
    static toModel(
        entity: AddressEntity | Omit<AddressEntity, 'id'>,
    ): AddressModelMongoDb {
        return {
            city: entity.city,
            state: entity.state,
            country: entity.country,
            complement: entity.complement,
            type: entity.type,
            isMain: entity.isMain,
            number: entity.number,
            street: entity.street,
            zipcode: entity.zipcode,
            phoneNumber: entity.phoneNumber,
            neighborhood: entity.neighborhood,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static toEntity(model: WithId<AddressModelMongoDb>): AddressEntity {
        return {
            id: objectIdToString(model._id),
            city: model.city,
            state: model.state,
            country: model.country,
            complement: model.complement,
            type: model.type,
            isMain: model.isMain,
            number: model.number,
            street: model.street,
            zipcode: model.zipcode,
            phoneNumber: model.phoneNumber,
            neighborhood: model.neighborhood,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        };
    }
}
