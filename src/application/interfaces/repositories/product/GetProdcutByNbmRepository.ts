import { ProductEntity } from '@core/entities';

export interface GetProductByNbmRepository {
    getByNbm(
        nbm: GetProductByNbmRepository.Request,
    ): Promise<GetProductByNbmRepository.Response>;
}

export namespace GetProductByNbmRepository {
    export type Request = string;
    export type Response = ProductEntity | null;
}
