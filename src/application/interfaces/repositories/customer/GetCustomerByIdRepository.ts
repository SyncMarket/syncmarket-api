import { Customer } from '@core/interfaces';

export interface GetCustomerByIdRepository {
    getById: (
        id: GetCustomerByIdRepository.Request,
    ) => Promise<GetCustomerByIdRepository.Response>;
}

export namespace GetCustomerByIdRepository {
    export type Request = string;
    export type Response = Customer | null;
}
