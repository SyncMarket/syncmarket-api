import { Product, ProductDTO } from '@core/interfaces';
import { Usecase } from '@application/interfaces';
import { Either } from '@core/either';
import { SkuAlreadyExistsError } from '@core/errors';

export interface CreateProductInterface
    extends Usecase<
        CreateProductInterface.Request,
        CreateProductInterface.Response
    > {
    execute(
        request: CreateProductInterface.Request,
    ): Promise<CreateProductInterface.Response>;
}

export namespace CreateProductInterface {
    export type Request = ProductDTO;
    export type ResponseErrors = SkuAlreadyExistsError;
    export type Response = Either<ResponseErrors, Product>;
}