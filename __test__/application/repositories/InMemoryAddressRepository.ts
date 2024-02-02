import { CreateAddressRepository } from '@application/interfaces';
import { AddressEntity } from '@core/entities';
import { Utils } from '@core/utils';
import { AddressRepository } from '@application/repositories';

export class InMemoryAddressRepository implements AddressRepository {
    private items: AddressEntity[] = [];

    async create(
        data: CreateAddressRepository.Request,
    ): Promise<CreateAddressRepository.Response> {
        const addressEntity = { ...data, id: 'addressId' };

        this.items.push(addressEntity);
        this.items = Utils.sortByProperty(this.items, 'createdAt');

        return addressEntity;
    }
}
