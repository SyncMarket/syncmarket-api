import { Usecase } from '@application/interfaces';
import { Either } from '@core/either';
import {
    DocumentAlreadyExistsError,
    EmailAlreadyExistsError,
} from '@core/errors';
import { Customer, CustomerDTO } from '@core/interfaces';

export interface CreateCustomerInterface
    extends Usecase<
        CreateCustomerInterface.Request,
        CreateCustomerInterface.Response
    > {
    execute(
        request: CreateCustomerInterface.Request,
    ): Promise<CreateCustomerInterface.Response>;
}

export namespace CreateCustomerInterface {
    export type Request = CustomerDTO;
    export type ResponseErrors =
        | EmailAlreadyExistsError
        | DocumentAlreadyExistsError;
    export type Response = Either<ResponseErrors, Customer>;
}
