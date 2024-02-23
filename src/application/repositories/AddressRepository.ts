import {
    CreateAddressRepository,
    GetAddressByIdRepository,
    GetAddressesByCustomerRepository,
    GetAddressesRepository,
    UpdateAddressRepository,
} from '@application/interfaces';

export abstract class AddressRepository
    implements
        CreateAddressRepository,
        GetAddressByIdRepository,
        GetAddressesRepository,
        UpdateAddressRepository,
        GetAddressesByCustomerRepository
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

    abstract getByCustomer(
        customerId: GetAddressesByCustomerRepository.Request,
    ): Promise<GetAddressesByCustomerRepository.Response>;
}
