import { CreateAddressRepository } from '@application/interfaces';

export abstract class AddressRepository implements CreateAddressRepository {
    abstract create(
        data: CreateAddressRepository.Request,
    ): Promise<CreateAddressRepository.Response>;
}
