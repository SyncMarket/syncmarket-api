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
    export type DTO = Partial<AddressDTO>;
    export type Request = { data: DTO; id: string };
    export type Errors = AddressNotFoundError;
    export type Data = Address;
    export type Response = Either<AddressNotFoundError, Address>;
}
