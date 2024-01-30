import { Customer, GetRequest, GetResponse } from '@core/interfaces';
import { Usecase } from '@application/interfaces';

export interface GetCustomersInterface
    extends Usecase<
        GetCustomersInterface.Request,
        GetCustomersInterface.Response
    > {
    execute(
        request: GetCustomersInterface.Request,
    ): Promise<GetCustomersInterface.Response>;
}

export namespace GetCustomersInterface {
    export type Request = GetRequest;
    export type Response = GetResponse<Customer>;
}
