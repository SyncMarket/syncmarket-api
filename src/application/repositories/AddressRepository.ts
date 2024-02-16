import {
    CreateAddressRepository,
    GetAddressByIdRepository,
    GetAddressesRepository,
} from '@application/interfaces';

export abstract class AddressRepository
    implements
        CreateAddressRepository,
        GetAddressByIdRepository,
        GetAddressesRepository
{
    abstract create(
        data: CreateAddressRepository.Request,
    ): Promise<CreateAddressRepository.Response>;

    abstract getById(
        id: GetAddressByIdRepository.Request,
    ): Promise<GetAddressByIdRepository.Response>;

    abstract get(
        request: GetAddressesRepository.Request,
    ): Promise<GetAddressesRepository.Response>;
}
