import { Product, ProductDTO } from '@core/interfaces';
import { Usecase } from '@application/interfaces';
import { Either } from '@core/either';
import {
    NbmAlreadyExistsError,
    ProductNotFoundError,
    SkuAlreadyExistsError,
} from '@core/errors';

export interface UpdateProductInterface
    extends Usecase<
        UpdateProductInterface.Request,
        UpdateProductInterface.Response
    > {
    execute(
        request: UpdateProductInterface.Request,
    ): Promise<UpdateProductInterface.Response>;
}

export namespace UpdateProductInterface {
    export type Request = { updateDTO: Partial<ProductDTO>; id: string };
    type ResponseErrors =
        | ProductNotFoundError
        | SkuAlreadyExistsError
        | NbmAlreadyExistsError;
    export type Response = Either<ResponseErrors, Product>;
}
