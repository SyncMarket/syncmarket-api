import { ObjectId } from 'mongodb';

export type CustomerModelMongoDb = {
    addressId: ObjectId;
    cartId: ObjectId;
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
