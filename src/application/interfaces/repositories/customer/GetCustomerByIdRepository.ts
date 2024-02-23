import { CustomerEntity } from '@core/entities';

export interface GetCustomerByIdRepository {
    getById(
        id: GetCustomerByIdRepository.Request,
    ): Promise<GetCustomerByIdRepository.Response>;
}

export namespace GetCustomerByIdRepository {
    export type Request = string;
    export type Response = CustomerEntity | null;
}
