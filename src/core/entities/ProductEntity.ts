import { ProductDTO, ProductImage, ProductWarranty } from '@core/interfaces';

export class ProductEntity {
    public readonly id: string;
    public categoryId: string;
    public brandId: string;
    public campaignId: { id: string }[];
    public name: string;
    public height: number;
    public width: number;
    public length: number;
    public weight: number;
    public images: ProductImage[];
    public warranty: ProductWarranty;
    public sku: string;
    public nbm: string;
    public price: number;
    public stock: number;
    public isActive: boolean;
    public isAvailable: boolean;
    public isDeleted: boolean;
    public createdAt: Date;
    public updatedAt: Date | null;
    public deletedAt: Date | null;

    constructor(props: ProductDTO) {
        Object.assign(this, props);
    }
}
