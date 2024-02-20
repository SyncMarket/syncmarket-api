import { CustomerEntity } from '@core/entities';
import { GetRequest, GetResponse } from '@core/interfaces';

export interface GetCustomersRepository {
    get(
        request: GetCustomersRepository.Request,
    ): Promise<GetCustomersRepository.Response>;
}

export namespace GetCustomersRepository {
    export type Request = GetRequest;
    export type Response = GetResponse<CustomerEntity>;
}
