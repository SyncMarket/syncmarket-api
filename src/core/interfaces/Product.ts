export interface ProductDTO {
    categoryId: string;
    brandId: string;
    campaignId: { id: string }[];
    name: string;
    height: number;
    width: number;
    length: number;
    weight: number;
    images: ProdcutImage[];
    warranty: ProductWarranty;
    sku: string;
    nbm: string;
    price: number;
    stock: number;
}

export type ProdcutImage = {
    url: string;
    alt: string;
    isMain: boolean;
};

export type ProductWarranty = {
    time: Date;
    text: string;
};
