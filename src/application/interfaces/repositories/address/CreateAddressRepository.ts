import { AddressEntity } from '@core/entities';

export interface CreateAddressRepository {
    create(
        data: CreateAddressRepository.Request,
    ): Promise<CreateAddressRepository.Response>;
}

export namespace CreateAddressRepository {
    export type Request = Omit<AddressEntity, 'id'>;
    export type Response = AddressEntity;
}
