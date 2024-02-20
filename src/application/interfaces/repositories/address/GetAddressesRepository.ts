import { AddressEntity } from '@core/entities';
import { GetRequest, GetResponse } from '@core/interfaces';

export interface GetAddressesRepository {
    get(
        request: GetAddressesRepository.Request,
    ): Promise<GetAddressesRepository.Response>;
}

export namespace GetAddressesRepository {
    export type Request = GetRequest;
    export type Response = GetResponse<AddressEntity>;
}
