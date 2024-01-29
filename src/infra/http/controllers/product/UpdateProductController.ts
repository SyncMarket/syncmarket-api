import { UpdateProductInterface } from '@application/interfaces';
import { HttpRequest, HttpResponse } from '@infra/http/interfaces';
import { BaseController } from '../BaseController';
import { conflict, notFound, ok } from '@infra/http/helpers';
import { NbmAlreadyExistsError, SkuAlreadyExistsError } from '@core/errors';
import { Product } from '@core/interfaces';

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

        if (product.isLeft()) {
            switch (true) {
                case product.value instanceof SkuAlreadyExistsError:
                    return conflict(product.value);
                case product.value instanceof NbmAlreadyExistsError:
                    return conflict(product.value);
                default:
                    return notFound(product.value);
            }
        }

        return ok(product.value);
    }
}

export namespace UpdateProductController {
    export type Request = HttpRequest<UpdateProductInterface.RequestDTO>;
    export type Response = HttpResponse<
        UpdateProductInterface.ResponseErrors | Product
    >;
}
