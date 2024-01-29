import { CreateCustomerInterface } from '@application/interfaces';
import { BaseController } from '@infra/http/controllers';
import { conflict, ok } from '@infra/http/helpers';
import { HttpRequest, HttpResponse } from '@infra/http/interfaces';

export class CreateCustomerController extends BaseController {
    constructor(private readonly createCustomer: CreateCustomerInterface) {
        super();
    }

    async execute(
        request: CreateCustomerController.Request,
    ): Promise<CreateCustomerController.Response> {
        const data = request.body;

        const response = await this.createCustomer.execute(data);

        if (response.isLeft()) {
            return conflict(response.value);
        }

        return ok(response.value);
    }
}

export namespace CreateCustomerController {
    export type Request = HttpRequest<CreateCustomerInterface.Request>;
    export type Response = HttpResponse<
        | CreateCustomerInterface.ResponseErrors
        | CreateCustomerInterface.ResponseData
    >;
}
