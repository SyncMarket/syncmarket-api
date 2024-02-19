import { Either } from '@core/either';
import { Address, AddressDTO } from '@core/interfaces';
import { Usecase } from '@application/interfaces';
import { CustomerNotFoundError } from '@core/errors';

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
    export type Errors = CustomerNotFoundError;
    export type Data = Address;
    export type Response = Either<Errors, Data>;
}
