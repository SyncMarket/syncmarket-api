import { ProductEntity } from '@core/entities';
import { GetRequest, GetResponseRepository } from '@core/interfaces';

export interface GetProductRepository {
    get(
        request: GetProductRepository.Request,
    ): Promise<GetProductRepository.Response>;
}

export namespace GetProductRepository {
    export type Request = GetRequest;
    export type Response = GetResponseRepository<ProductEntity>;
}
