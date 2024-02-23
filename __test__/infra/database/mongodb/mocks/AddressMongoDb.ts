import { AddressEntity } from '@core/entities';
import { makeFakeAddressEntity } from '@test/core/entities';
import { ObjectId } from 'mongodb';
import { objectIdToString } from '@infra/database/mongodb';

export const makeFakeAddressMongo = (): AddressEntity => {
    const addressEntity = makeFakeAddressEntity();
    return {
        ...addressEntity,
        customerId: objectIdToString(new ObjectId()),
        id: objectIdToString(new ObjectId()),
    };
};
