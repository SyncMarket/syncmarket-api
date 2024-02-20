import { GetCustomerByIdInterface } from '@application/interfaces';
import { BaseController } from '../BaseController';
import { HttpRequest, HttpResponse } from '@infra/http/interfaces';
import { notFound, ok } from '@infra/http/helpers';

export class GetCustomerByIdController extends BaseController {
    constructor(private readonly getCustomerById: GetCustomerByIdInterface) {
        super();
    }

    public async execute(
        request: GetCustomerByIdController.Request,
    ): Promise<GetCustomerByIdController.Response> {
        const { id } = request.params;

        const response = await this.getCustomerById.execute(id);

        if (response.isLeft()) {
            return notFound(response.value);
        }

        return ok(response.value);
    }
}

export namespace GetCustomerByIdController {
    export type Request = HttpRequest<GetCustomerByIdInterface.Request>;
    export type Response = HttpResponse<
        | GetCustomerByIdInterface.ResponseErrors
        | GetCustomerByIdInterface.ResponseData
    >;
}
