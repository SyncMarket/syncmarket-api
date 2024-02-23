import { Either } from '@core/either';
import { CustomerNotFoundError } from '@core/errors';
import { Address } from '@core/interfaces';
import { Usecase } from '../Usecase';

export interface GetAddressesByCustomerInterface
    extends Usecase<
        GetAddressesByCustomerInterface.Request,
        GetAddressesByCustomerInterface.Response
    > {
    execute(
        customerId: GetAddressesByCustomerInterface.Request,
    ): Promise<GetAddressesByCustomerInterface.Response>;
}

export namespace GetAddressesByCustomerInterface {
    export type Request = string;
    export type Response = Either<CustomerNotFoundError, Address[]>;
}
