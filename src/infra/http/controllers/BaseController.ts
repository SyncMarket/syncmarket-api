import { HttpRequest, HttpResponse, Validation } from '@infra/http/interfaces';
import { badRequest, serverError } from '@infra/http/helpers';

export abstract class BaseController {
    constructor(private readonly validation?: Validation) {}
    abstract execute(request: HttpRequest): Promise<HttpResponse>;

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation?.validate(httpRequest.body);

            if (error.isLeft()) {
                return badRequest(error.value);
            }

            return await this.execute(httpRequest);
        } catch (error) {
            return serverError(error);
        }
    }
}
