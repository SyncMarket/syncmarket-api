import { Either } from '@core/either';
import { Customer, CustomerDTO } from '@core/interfaces';
import { Usecase } from '@application/interfaces';
import {
    CustomerNotFoundError,
    DocumentAlreadyExistsError,
    EmailAlreadyExistsError,
} from '@core/errors';

export interface UpdateCustomerInterface
    extends Usecase<
        UpdateCustomerInterface.Request,
        UpdateCustomerInterface.Response
    > {
    execute(
        request: UpdateCustomerInterface.Request,
    ): Promise<UpdateCustomerInterface.Response>;
}

export namespace UpdateCustomerInterface {
    export type RequestData = Partial<CustomerDTO>;
    export type Request = { id: string; data: RequestData };
    export type ResponseErrors =
        | CustomerNotFoundError
        | EmailAlreadyExistsError
        | DocumentAlreadyExistsError;
    export type ResponseData = Customer;
    export type Response = Either<ResponseErrors, ResponseData>;
}
