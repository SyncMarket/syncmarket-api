import { ProductEntity } from '@core/entities';

export interface GetProductByIdRepository {
    getById(
        productId: GetProductByIdRepository.Request,
    ): Promise<GetProductByIdRepository.Response>;
}

export namespace GetProductByIdRepository {
    export type Request = string;
    export type Response = ProductEntity | null;
}
