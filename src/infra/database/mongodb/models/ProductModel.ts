import { ProductImage, ProductWarranty } from '@core/interfaces';
import { ObjectId } from 'mongodb';

export type ProductModelMongoDb = {
    categoryId: ObjectId;
    brandId: ObjectId;
    campaignId: { _id: ObjectId }[];
    name: string;
    height: number;
    width: number;
    length: number;
    weight: number;
    images: ProductImage[];
    warranty: ProductWarranty;
    sku: string;
    nbm: string;
    price: number;
    stock: number;
    isActive: boolean;
    isAvailable: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
