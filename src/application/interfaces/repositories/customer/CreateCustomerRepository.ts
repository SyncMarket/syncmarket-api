import { CustomerEntity } from '@core/entities';

export interface CreateCustomerRepository {
    create(
        data: CreateCustomerRepository.Request,
    ): Promise<CreateCustomerRepository.Response>;
}

export namespace CreateCustomerRepository {
    export type Request = Omit<CustomerEntity, 'id'>;
    export type Response = CustomerEntity;
}
