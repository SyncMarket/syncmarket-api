import { GetAddressesInterface } from '@application/interfaces';
import { HttpRequest, HttpResponse } from '@infra/http/interfaces';
import { BaseController } from '../BaseController';
import { ok } from '@infra/http/helpers';

export class GetAddressesController extends BaseController {
    constructor(private readonly getAddresses: GetAddressesInterface) {
        super();
    }

    public async execute(
        request: GetAddressesController.Request,
    ): Promise<GetAddressesController.Response> {
        const response = await this.getAddresses.execute(request.query);
        return ok(response);
    }
}

export namespace GetAddressesController {
    export type Request = HttpRequest<GetAddressesInterface.Request>;
    export type Response = HttpResponse<GetAddressesInterface.Response>;
}
