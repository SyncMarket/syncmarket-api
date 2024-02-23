import { AddressEntity } from '@core/entities';

export interface GetAddressesByCustomerRepository {
    getByCustomer(
        customerId: GetAddressesByCustomerRepository.Request,
    ): Promise<GetAddressesByCustomerRepository.Response>;
}

export namespace GetAddressesByCustomerRepository {
    export type Request = string;
    export type Response = AddressEntity[];
}
