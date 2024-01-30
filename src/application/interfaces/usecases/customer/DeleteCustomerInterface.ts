import { Usecase } from '@application/interfaces';
import { Either } from '@core/either';
import { CustomerNotFoundError } from '@core/errors';

export interface DeleteCustomerInterface
    extends Usecase<
        DeleteCustomerInterface.Request,
        DeleteCustomerInterface.Response
    > {
    execute(
        id: DeleteCustomerInterface.Request,
    ): Promise<DeleteCustomerInterface.Response>;
}

export namespace DeleteCustomerInterface {
    export type Request = string;
    export type Response = Either<CustomerNotFoundError, void>;
}
