export interface ProductDTO {
    categoryId: string;
    brandId: string;
    campaignId: { id: string }[];
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
}

export type ProductImage = {
    url: string;
    alt: string;
    isMain: boolean;
};

export type ProductWarranty = {
    time: Date;
    text: string;
};

export interface Product extends ProductDTO {
    isActive: boolean;
    isAvailable: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}
