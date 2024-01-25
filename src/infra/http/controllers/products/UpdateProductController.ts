import { UpdateProductInterface } from '@application/interfaces';
import { HttpRequest, HttpResponse } from '@infra/http/interfaces';
import { BaseController } from '../BaseController';
import { notFound, ok } from '@infra/http/helpers';
import { ProductNotFoundError } from '@core/errors';

export class UpdateProductController extends BaseController {
    constructor(private readonly updateProduct: UpdateProductInterface) {
        super();
    }

    async execute(
        httpRequest: UpdateProductController.Request,
    ): Promise<UpdateProductController.Response> {
        const data = httpRequest.body;
        const { id } = httpRequest.params;

        const product = await this.updateProduct.execute({
            id,
            data,
        });

        switch (product.value) {
            case new ProductNotFoundError(id):
                return notFound(product);

            default:
                return ok(product);
        }
    }
}

export namespace UpdateProductController {
    export type Request = HttpRequest<UpdateProductInterface.RequestDTO>;
    export type Response = HttpResponse<UpdateProductInterface.Response>;
}
