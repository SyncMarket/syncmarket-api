import { UpdateAddressInterface } from '@application/interfaces';
import { AddressRepository } from '@application/repositories';
import { left, right } from '@core/either';
import { AddressEntity } from '@core/entities';
import { AddressNotFoundError } from '@core/errors';

export class UpdateAddress implements UpdateAddressInterface {
    constructor(private readonly addressRepository: AddressRepository) {}

    public async execute(
        request: UpdateAddressInterface.Request,
    ): Promise<UpdateAddressInterface.Response> {
        const { id, data } = request;
        const addressEntity = await this.addressRepository.getById(id);
        if (!addressEntity) {
            return left(new AddressNotFoundError(id));
        }
        const updatedAddressEntity: AddressEntity = {
            ...addressEntity,
            ...data,
        };
        await this.addressRepository.update({ id, data: updatedAddressEntity });
        return right(updatedAddressEntity);
    }
}
