import { GetAddressByIdInterface } from '@application/interfaces';
import { BaseController } from '../BaseController';
import { HttpRequest, HttpResponse } from '@infra/http/interfaces';
import { conflict, ok } from '@infra/http/helpers';

export class GetAddressByIdController extends BaseController {
    constructor(private readonly getAddressById: GetAddressByIdInterface) {
        super();
    }

    public async execute(
        request: GetAddressByIdController.Request,
    ): Promise<GetAddressByIdController.Response> {
        const { id } = request.params;

        const response = await this.getAddressById.execute(id);

        if (response.isLeft()) {
            return conflict(response.value);
        }

        return ok(response.value);
    }
}

export namespace GetAddressByIdController {
    export type Request = HttpRequest<GetAddressByIdInterface.Request>;
    export type Response = HttpResponse<
        GetAddressByIdInterface.Errors | GetAddressByIdInterface.Data
    >;
}
