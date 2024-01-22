import { HttpRequest, HttpResponse } from '@infra/http/interfaces';
import { BaseController } from '@infra/http/controllers';
import { CreateProductInterface } from '@application/interfaces/usecases';
import { ok } from '@infra/http/helpers';

export class CreateProductController extends BaseController {
    constructor(private readonly createProduct: CreateProductInterface) {
        super();
    }

    async execute(
        httpRequest: CreateProductController.Request,
    ): Promise<CreateProductController.Response> {
        const productDTO = httpRequest.body;

        const product = await this.createProduct.execute(productDTO);

        return ok(product);
    }
}

export namespace CreateProductController {
    export type Request = HttpRequest<CreateProductInterface.Request>;
    export type Response = HttpResponse<CreateProductInterface.Response>;
}
