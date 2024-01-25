import { HttpRequest, HttpResponse } from '@infra/http/interfaces';
import { BaseController } from '@infra/http/controllers';
import { ok } from '@infra/http/helpers';
import { CreateProductInterface } from '@application/interfaces';

export class CreateProductController extends BaseController {
    constructor(private readonly createProduct: CreateProductInterface) {
        super();
    }

    async execute(
        httpRequest: CreateProductController.Request,
    ): Promise<CreateProductController.Response> {
        const data = httpRequest.body;

        const product = await this.createProduct.execute(data);

        return ok(product);
    }
}

export namespace CreateProductController {
    export type Request = HttpRequest<CreateProductInterface.Request>;
    export type Response = HttpResponse<CreateProductInterface.Response>;
}
