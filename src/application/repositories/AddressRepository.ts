import {
    CreateAddressRepository,
    GetAddressByIdRepository,
    GetAddressesRepository,
    UpdateAddressRepository,
} from '@application/interfaces';

export abstract class AddressRepository
    implements
        CreateAddressRepository,
        GetAddressByIdRepository,
        GetAddressesRepository,
        UpdateAddressRepository
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

    abstract update(
        request: UpdateAddressRepository.Request,
    ): Promise<UpdateAddressRepository.Response>;
}
