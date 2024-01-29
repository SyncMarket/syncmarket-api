import { CustomerEntity } from '@core/entities';

export interface CreateCustomerRepository {
    create(
        entity: CreateCustomerRepository.Request,
    ): Promise<CreateCustomerRepository.Response>;
}

export namespace CreateCustomerRepository {
    export type Request = Omit<CustomerEntity, 'id'>;
    export type Response = CustomerEntity;
}
