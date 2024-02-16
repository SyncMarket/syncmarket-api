import { Either } from '@core/either';
import { AddressNotFoundError } from '@core/errors';
import { Address, AddressDTO } from '@core/interfaces';
import { Usecase } from '@application/interfaces';

export interface UpdateAddressInterface
    extends Usecase<
        UpdateAddressInterface.Request,
        UpdateAddressInterface.Response
    > {
    execute(
        request: UpdateAddressInterface.Request,
    ): Promise<UpdateAddressInterface.Response>;
}

export namespace UpdateAddressInterface {
    export type Request = { data: Partial<AddressDTO>; id: string };
    export type Response = Either<AddressNotFoundError, Address>;
}
