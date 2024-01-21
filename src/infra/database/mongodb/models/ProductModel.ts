import { ProductImage } from '@core/interfaces';
import { ObjectId } from 'mongodb';

export type ProductModel = {
    categoryId: ObjectId;
    brandId: ObjectId;
    campaignId: { _id: ObjectId }[];
    name: string;
    height: number;
    width: number;
    length: number;
    weight: number;
    images: ProductImage[];
    warranty: {
        time: number;
        text: string;
    };
    sku: string;
    nbm: string;
    price: number;
    stock: number;
    isActive: boolean;
    isAvailable: boolean;
    isDeleted: boolean;
    createdAt: number;
    updatedAt: number | null;
    deletedAt: number | null;
};
