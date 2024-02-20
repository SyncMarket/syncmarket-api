import { Address, GetRequest, GetResponse } from '@core/interfaces';
import { Usecase } from '@application/interfaces';

export interface GetAddressesInterface
    extends Usecase<
        GetAddressesInterface.Request,
        GetAddressesInterface.Response
    > {
    execute(
        request: GetAddressesInterface.Request,
    ): Promise<GetAddressesInterface.Response>;
}
export namespace GetAddressesInterface {
    export type Request = GetRequest;
    export type Response = GetResponse<Address>;
}
