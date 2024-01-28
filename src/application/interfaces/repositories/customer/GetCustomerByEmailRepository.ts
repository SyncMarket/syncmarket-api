import { CustomerEntity } from '@core/entities';

export interface GetCustomerByEmailRepository {
    getByEmail(
        email: GetCustomerByEmailRepository.Request,
    ): Promise<GetCustomerByEmailRepository.Response>;
}

export namespace GetCustomerByEmailRepository {
    export type Request = string;
    export type Response = CustomerEntity | null;
}
