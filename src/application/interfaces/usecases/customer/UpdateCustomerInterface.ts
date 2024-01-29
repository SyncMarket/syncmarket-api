import { Either } from '@core/either';
import { Customer, CustomerDTO } from '@core/interfaces';
import { Usecase } from '@application/interfaces';

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
    export type Request = { id: string; updateDTO: Partial<CustomerDTO> };
    export type ResponseErrors = Error;
    export type ResponseData = Customer;
    export type Response = Either<ResponseErrors, ResponseData>;
}
