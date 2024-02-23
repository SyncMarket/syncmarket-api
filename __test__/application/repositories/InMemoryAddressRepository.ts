import {
    CreateAddressRepository,
    GetAddressesByCustomerRepository,
    GetAddressesRepository,
    UpdateAddressRepository,
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

    public async update(
        request: UpdateAddressRepository.Request,
    ): Promise<UpdateAddressRepository.Response> {
        const { data, id } = request;
        const index = this.items.findIndex((item) => item.id === id);
        this.items[index] = { ...data, id };
    }

    public async getByCustomer(
        customerId: GetAddressesByCustomerRepository.Request,
    ): Promise<GetAddressesByCustomerRepository.Response> {
        const addressesEntities: AddressEntity[] = [];
        this.items.forEach((item) => {
            if (item.customerId === customerId) {
                addressesEntities.push(item);
            }
        });
        return addressesEntities;
    }
}
