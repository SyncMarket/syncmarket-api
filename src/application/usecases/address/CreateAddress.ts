import {
    CreateAddressInterface,
    CreateAddressRepository,
} from '@application/interfaces';
import { right } from '@core/either';
import { AddressEntity } from '@core/entities';

export class CreateAddress implements CreateAddressInterface {
    constructor(
        private readonly createAddressRepository: CreateAddressRepository,
    ) {}

    async execute(
        request: CreateAddressInterface.Request,
    ): Promise<CreateAddressInterface.Response> {
        const { addressDTO } = request;

        const addressEntity = new AddressEntity(addressDTO);

        const { id } = await this.createAddressRepository.create(addressEntity);

        const address = { ...addressEntity, id };

        return right(address);
    }
}
