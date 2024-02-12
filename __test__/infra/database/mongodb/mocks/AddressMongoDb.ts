import { AddressEntity } from '@core/entities';
import { objectIdToString } from '@infra/database/mongodb';
import { makeFakeAddressEntity } from '@test/core/entities';
import { ObjectId } from 'mongodb';

export const makeFakeAddressMongo = (): AddressEntity => {
    const addressEntity = makeFakeAddressEntity();

    return { ...addressEntity, id: objectIdToString(new ObjectId()) };
};
