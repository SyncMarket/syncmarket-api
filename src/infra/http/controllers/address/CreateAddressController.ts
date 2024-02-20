import { CreateAddressInterface } from '@application/interfaces';
import { BaseController } from '../BaseController';
import { HttpRequest, HttpResponse } from '@infra/http/interfaces';
import { notFound, ok } from '@infra/http/helpers';

export class CreateAddressController extends BaseController {
    constructor(private readonly createAddress: CreateAddressInterface) {
        super();
    }

    async execute(
        request: CreateAddressController.Request,
    ): Promise<CreateAddressController.Response> {
        const data = request.body;

        const response = await this.createAddress.execute(data);

        if (response.isLeft()) {
            return notFound(response.value);
        }

        return ok(response.value);
    }
}

export namespace CreateAddressController {
    export type Request = HttpRequest<CreateAddressInterface.Request>;
    export type Response = HttpResponse<
        CreateAddressInterface.Errors | CreateAddressInterface.Data
    >;
}
