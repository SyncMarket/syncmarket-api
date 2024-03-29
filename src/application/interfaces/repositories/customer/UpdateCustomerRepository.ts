import { CustomerEntity } from '@core/entities';

export interface UpdateCustomerRepository {
    update(
        request: UpdateCustomerRepository.Request,
    ): Promise<UpdateCustomerRepository.Response>;
}

export namespace UpdateCustomerRepository {
    export type Request = { id: string; data: CustomerEntity };
    export type Response = void;
}
