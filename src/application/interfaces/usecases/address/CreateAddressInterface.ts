import { Either } from '@core/either';
import { Address, AddressDTO } from '@core/interfaces';
import { Usecase } from '@application/interfaces';

export interface CreateAddressInterface
    extends Usecase<
        CreateAddressInterface.Request,
        CreateAddressInterface.Response
    > {
    execute(
        request: CreateAddressInterface.Request,
    ): Promise<CreateAddressInterface.Response>;
}

export namespace CreateAddressInterface {
    export type Request = { customerId: string; addressDTO: AddressDTO };
    export type Response = Either<Error, Address>;
}
