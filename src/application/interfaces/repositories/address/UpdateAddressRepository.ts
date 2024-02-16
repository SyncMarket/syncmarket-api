import { AddressEntity } from '@core/entities';

export interface UpdateAddressRepository {
    update(
        request: UpdateAddressRepository.Request,
    ): Promise<UpdateAddressRepository.Response>;
}

export namespace UpdateAddressRepository {
    export type Request = { data: AddressEntity; id: string };
    export type Response = void;
}
