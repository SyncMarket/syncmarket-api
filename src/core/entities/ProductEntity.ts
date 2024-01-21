import { ProdcutImage, ProductDTO, ProductWarranty } from '@core/interfaces';

export class ProductEntity {
    public readonly id: string;
    public readonly categoryId: string;
    public readonly brandId: string;
    public readonly campaignId: { id: string }[];
    public readonly name: string;
    public readonly height: number;
    public readonly width: number;
    public readonly length: number;
    public readonly weight: number;
    public readonly images: ProdcutImage[];
    public readonly warranty: ProductWarranty;
    public readonly sku: string;
    public readonly nbm: string;
    public readonly price: number;
    public readonly stock: number;
    public readonly isActive: boolean;
    public readonly isAvailable: boolean;
    public readonly isDeleted: boolean;
    public readonly createdAt: Date;
    public readonly updatedAt: Date | null;
    public readonly deletedAt: Date | null;

    private constructor(props: ProductDTO) {
        Object.assign(this, props);

        this.isActive = true;
        this.isAvailable = true;
        this.isDeleted = false;
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
}
