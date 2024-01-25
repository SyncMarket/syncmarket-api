import { ProductEntity } from '@core/entities';

export interface UpdateProductRepository {
    update(
        request: UpdateProductRepository.Request,
    ): Promise<UpdateProductRepository.Response>;
}

export namespace UpdateProductRepository {
    export type Request = ProductEntity;
    export type Response = void;
}
