import { ProductEntity } from '@core/entities';

export interface GetProductBySkuRepository {
    getBySku(
        sku: GetProductBySkuRepository.Request,
    ): Promise<GetProductBySkuRepository.Response>;
}

export namespace GetProductBySkuRepository {
    export type Request = string;
    export type Response = ProductEntity | null;
}
