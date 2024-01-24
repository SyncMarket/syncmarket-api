import { GetProductByIdInterface } from '@application/interfaces';
import { BaseController } from '@infra/http/controllers';
import { ok } from '@infra/http/helpers';
import { HttpRequest, HttpResponse } from '@infra/http/interfaces';

export class GetProductByIdController extends BaseController {
    constructor(private readonly getProductById: GetProductByIdInterface) {
        super();
    }

    async execute(
        httpRequest: GetProductByIdController.Request,
    ): Promise<GetProductByIdController.Response> {
        const productDTO = httpRequest.body;

        const product = await this.getProductById.execute(productDTO);

        return ok(product);
    }
}

export namespace GetProductByIdController {
    export type Request = HttpRequest<GetProductByIdInterface.Request>;
    export type Response = HttpResponse<GetProductByIdInterface.Response>;
}
