import {
    CreateAddressRepository,
    GetAddressesRepository,
} from '@application/interfaces';
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

    async getById(id: string): Promise<AddressEntity | null> {
        return this.items.find((item) => item.id === id) || null;
    }

    async get(
        request: GetAddressesRepository.Request,
    ): Promise<GetAddressesRepository.Response> {
        const { page, pageSize } = request;

        const data = this.items.slice(page, page + pageSize);

        const total = this.items.length;

        return {
            data,
            page: {
                elements: data.length,
                totalElements: total,
                number: page,
            },
        };
    }
}
