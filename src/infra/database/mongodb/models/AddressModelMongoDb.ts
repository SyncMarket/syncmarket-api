import { ObjectId } from 'mongodb';

export type AddressModelMongoDb = {
    customerId: ObjectId;
    city: string;
    state: string;
    street: string;
    number: string;
    zipcode: string;
    complement: string;
    neighborhood: string;
    type: string;
    isMain: boolean;
    country: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
};
