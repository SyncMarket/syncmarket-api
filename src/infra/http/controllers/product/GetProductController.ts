import { GetProductInterface } from '@application/interfaces';
import { GetRequest } from '@core/interfaces';
import { BaseController } from '@infra/http/controllers';
import { ok } from '@infra/http/helpers';
import { HttpRequest, HttpResponse } from '@infra/http/interfaces';

export class GetProductController extends BaseController {
    constructor(private readonly getProduct: GetProductInterface) {
        super();
    }

    async execute(
        httpRequest: GetProductController.Request,
    ): Promise<GetProductController.Response> {
        const request: GetRequest = {
            page: httpRequest.query?.page ?? 1,
            pageSize: httpRequest.query?.pageSize ?? 10,
        };

        const product = await this.getProduct.execute(request);

        return ok(product);
    }
}

export namespace GetProductController {
    export type Request = HttpRequest<GetProductInterface.Request>;
    export type Response = HttpResponse<GetProductInterface.Response>;
}
