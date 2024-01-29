import { CustomerEntity } from '@core/entities';
import { objectIdToString } from '@infra/database/mongodb';
import { makeFakeCustomerEntity } from '@test/core/entities';
import { ObjectId } from 'mongodb';

export const makeFakeCustomerMongo = (): CustomerEntity => {
    const customerEntity = makeFakeCustomerEntity();

    customerEntity.addressId = objectIdToString(new ObjectId());
    customerEntity.cartId = null;

    return { ...customerEntity, id: objectIdToString(new ObjectId()) };
};