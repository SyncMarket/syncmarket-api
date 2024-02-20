import { UpdateCustomerInterface } from '@application/interfaces';
import { CustomerNotFoundError } from '@core/errors';
import { BaseController } from '@infra/http/controllers';
import { conflict, notFound, ok } from '@infra/http/helpers';
import { HttpRequest, HttpResponse } from '@infra/http/interfaces';

export class UpdateCustomerController extends BaseController {
    constructor(private readonly updateCustomer: UpdateCustomerInterface) {
        super();
    }

    public async execute(
        request: UpdateCustomerController.Request,
    ): Promise<UpdateCustomerController.Response> {
        const { id } = request.params;
        const data = request.body;

        const response = await this.updateCustomer.execute({ id, data });

        if (response.isLeft()) {
            return this.handleError(response.value);
        }

        return ok(response.value);
    }

    private handleError(error: Error) {
        if (error instanceof CustomerNotFoundError) {
            return notFound(error);
        }

        return conflict(error);
    }
}

export namespace UpdateCustomerController {
    export type Request = HttpRequest<
        UpdateCustomerInterface.RequestData,
        { id: string }
    >;
    export type Response = HttpResponse<
        | UpdateCustomerInterface.ResponseErrors
        | UpdateCustomerInterface.ResponseData
    >;
}
