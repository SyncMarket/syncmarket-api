import { Product } from '@core/interfaces';
import { Usecase } from '@application/interfaces';
import { Either } from '@core/either';
import { ProductNotFoundError } from '@core/errors';

export interface GetProductByIdInterface
    extends Usecase<
        GetProductByIdInterface.Request,
        GetProductByIdInterface.Response
    > {
    execute(
        productId: GetProductByIdInterface.Request,
    ): Promise<GetProductByIdInterface.Response>;
}

export namespace GetProductByIdInterface {
    export type Request = string;
    export type Response = Either<ProductNotFoundError, Product>;
}
