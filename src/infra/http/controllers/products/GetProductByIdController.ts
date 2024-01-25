import { GetProductByIdInterface } from '@application/interfaces';
import { BaseController } from '@infra/http/controllers';
import { notFound, ok } from '@infra/http/helpers';
import { HttpRequest, HttpResponse } from '@infra/http/interfaces';

export class GetProductByIdController extends BaseController {
    constructor(private readonly getProductById: GetProductByIdInterface) {
        super();
    }

    async execute(
        httpRequest: GetProductByIdController.Request,
    ): Promise<GetProductByIdController.Response> {
        const id = httpRequest.params.id;

        const product = await this.getProductById.execute(id);

        if (product.isLeft()) {
            return notFound(product.value);
        }

        return ok(product.value);
    }
}

export namespace GetProductByIdController {
    export type Request = HttpRequest<GetProductByIdInterface.Request>;
    export type Response = HttpResponse<GetProductByIdInterface.ResponseData>;
}
