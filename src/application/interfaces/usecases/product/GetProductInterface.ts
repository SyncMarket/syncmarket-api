import { GetRequest, GetResponse, Product } from '@core/interfaces';
import { Usecase } from '@application/interfaces';

export interface GetProductInterface
    extends Usecase<GetProductInterface.Request, GetProductInterface.Response> {
    execute(
        request: GetProductInterface.Request,
    ): Promise<GetProductInterface.Response>;
}

export namespace GetProductInterface {
    export type Request = GetRequest;
    export type Response = GetResponse<Product>;
}
