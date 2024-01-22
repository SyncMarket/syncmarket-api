import { HttpRequest, HttpResponse, Validation } from '@infra/http/interfaces';
import { badRequest, serverError } from '@infra/http/helpers';

export abstract class BaseController {
    constructor(private readonly validation?: Validation) {}
    abstract execute(request: HttpRequest): Promise<HttpResponse>;

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation?.validate(httpRequest.body);

            if (error) {
                return badRequest(error);
            }

            return await this.execute(httpRequest);
        } catch (error) {
            console.error(error);

            return serverError(error);
        }
    }
}
