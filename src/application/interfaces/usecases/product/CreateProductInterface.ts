import { Product, ProductDTO } from '@core/interfaces';
import { Usecase } from '@application/interfaces';

export interface CreateProductInterface
    extends Usecase<
        CreateProductInterface.Request,
        CreateProductInterface.Response
    > {
    execute(request: CreateProductInterface.Request): Promise<Product>;
}

export namespace CreateProductInterface {
    export type Request = ProductDTO;
    export type Response = Product;
}
