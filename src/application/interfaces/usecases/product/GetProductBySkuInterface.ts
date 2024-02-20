import { Product } from '@core/interfaces';
import { Usecase } from '@application/interfaces';
import { Either } from '@core/either';
import { ProductNotFoundError } from '@core/errors';

export interface GetProductBySkuInterface
    extends Usecase<
        GetProductBySkuInterface.Request,
        GetProductBySkuInterface.Response
    > {
    execute(
        sku: GetProductBySkuInterface.Request,
    ): Promise<GetProductBySkuInterface.Response>;
}

export namespace GetProductBySkuInterface {
    export type Request = string;
    export type Response = Either<ProductNotFoundError, Product>;
}
