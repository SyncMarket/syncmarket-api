import { GetAddressByIdInterface } from '@application/interfaces';
import { AddressRepository } from '@application/repositories';
import { left, right } from '@core/either';
import { AddressNotFoundError } from '@core/errors';

export class GetAddressById implements GetAddressByIdInterface {
    constructor(private readonly addressRepository: AddressRepository) {}

    async execute(
        request: GetAddressByIdInterface.Request,
    ): Promise<GetAddressByIdInterface.Response> {
        const { id } = request;

        const addressEntity = await this.addressRepository.getById(id);

        if (!addressEntity) {
            return left(new AddressNotFoundError(id));
        }

        return right(addressEntity);
    }
}
