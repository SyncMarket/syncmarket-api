import { DeleteCustomerInterface } from '@application/interfaces';
import { BaseController } from '@infra/http/controllers';
import { noContent, notFound } from '@infra/http/helpers';
import { HttpRequest, HttpResponse } from '@infra/http/interfaces';

export class DeleteCustomerController extends BaseController {
    constructor(private readonly deleteCustomer: DeleteCustomerInterface) {
        super();
    }

    public async execute(
        request: DeleteCustomerController.Request,
    ): Promise<DeleteCustomerController.Response> {
        const response = await this.deleteCustomer.execute(request.params.id);

        if (response.isLeft()) {
            return notFound(response.value);
        }

        return noContent();
    }
}

export namespace DeleteCustomerController {
    export type Request = HttpRequest<undefined, { id: string }>;
    export type Response = HttpResponse;
}
