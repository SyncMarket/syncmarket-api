import { CustomerAddress } from '@core/interfaces';
import { ObjectId } from 'mongodb';

export type CustomerModelMongoDb = {
    name: string;
    email: string;
    document: string;
    birthDate: Date;
    phoneNumber: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
};

export interface CustomerAddressModelMongoDb
    extends Omit<CustomerAddress, 'id'> {
    _id: ObjectId;
}
