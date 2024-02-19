import { UpdateAddressInterface } from '@application/interfaces';
import { HttpRequest, HttpResponse } from '@infra/http/interfaces';
import { BaseController } from '../BaseController';
import { notFound, ok } from '@infra/http/helpers';

export class UpdateAddressController extends BaseController {
    constructor(private readonly updateAddress: UpdateAddressInterface) {
        super();
    }

    public async execute(
        request: UpdateAddressController.Request,
    ): Promise<UpdateAddressController.Response> {
        const data = request.body;
        const id = request.params.id;
        const response = await this.updateAddress.execute({ data, id });
        if (response.isLeft()) {
            return notFound(response.value);
        }
        return ok(response.value);
    }
}

export namespace UpdateAddressController {
    export type Request = HttpRequest<
        UpdateAddressInterface.DTO,
        { id: string }
    >;
    export type Response = HttpResponse<
        UpdateAddressInterface.Errors | UpdateAddressInterface.Data
    >;
}
