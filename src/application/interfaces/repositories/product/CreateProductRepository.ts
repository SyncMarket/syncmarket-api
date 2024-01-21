import { ProductEntity } from '@/core/entities';

export interface CreateProductRepository {
    create(
        request: CreateProductRepository.Request,
    ): Promise<CreateProductRepository.Response>;
}

export namespace CreateProductRepository {
    export type Request = Omit<ProductEntity, 'id'>;
    export type Response = ProductEntity;
}
