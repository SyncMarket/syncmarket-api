import { Either } from '@core/either';
import { Address } from '@core/interfaces';
import { AddressNotFoundError } from '@core/errors';
import { Usecase } from '@application/interfaces';

export interface GetAddressByIdInterface
    extends Usecase<
        GetAddressByIdInterface.Request,
        GetAddressByIdInterface.Response
    > {
    execute(
        request: GetAddressByIdInterface.Request,
    ): Promise<GetAddressByIdInterface.Response>;
}

export namespace GetAddressByIdInterface {
    export type Request = { id: string };
    export type Response = Either<AddressNotFoundError, Address>;
}
