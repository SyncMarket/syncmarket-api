import { UpdateProductInterface } from '@application/interfaces';
import { HttpRequest, HttpResponse } from '@infra/http/interfaces';
import { BaseController } from '../BaseController';
import { conflict, notFound, ok } from '@infra/http/helpers';
import { NbmAlreadyExistsError, SkuAlreadyExistsError } from '@core/errors';

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
                    return conflict(product);
                case product.value instanceof NbmAlreadyExistsError:
                    return conflict(product);
                default:
                    return notFound(product);
            }
        }

        return ok(product);
    }
}

export namespace UpdateProductController {
    export type Request = HttpRequest<UpdateProductInterface.RequestDTO>;
    export type Response = HttpResponse<UpdateProductInterface.Response>;
}
