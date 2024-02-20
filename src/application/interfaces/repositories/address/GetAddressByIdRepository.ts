import { AddressEntity } from '@core/entities';

export interface GetAddressByIdRepository {
    getById(
        id: GetAddressByIdRepository.Request,
    ): Promise<GetAddressByIdRepository.Response>;
}

export namespace GetAddressByIdRepository {
    export type Request = string;
    export type Response = AddressEntity | null;
}
