import { ObjectId } from 'mongodb';

export const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);

export const objectIdToString = (objectId: ObjectId): string =>
    objectId.toHexString();

export const stringToObjectId = (string: string): ObjectId =>
    new ObjectId(string);
