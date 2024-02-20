import { Usecase } from '@application/interfaces';
import { Either } from '@core/either';
import { CustomerNotFoundError } from '@core/errors';
import { Customer } from '@core/interfaces';

export interface GetCustomerByIdInterface
    extends Usecase<
        GetCustomerByIdInterface.Request,
        GetCustomerByIdInterface.Response
    > {
    execute(
        id: GetCustomerByIdInterface.Request,
    ): Promise<GetCustomerByIdInterface.Response>;
}

export namespace GetCustomerByIdInterface {
    export type Request = string;
    export type ResponseErrors = CustomerNotFoundError;
    export type ResponseData = Customer;
    export type Response = Either<ResponseErrors, ResponseData>;
}
