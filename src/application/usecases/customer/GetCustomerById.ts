import {
    GetCustomerByIdInterface,
    GetCustomerByIdRepository,
} from '@application/interfaces';
import { left, right } from '@core/either';
import { CustomerNotFoundError } from '@core/errors';

export class GetCustomerById implements GetCustomerByIdInterface {
    constructor(
        private readonly getCustomerByIdRepository: GetCustomerByIdRepository,
    ) {}

    async execute(
        id: GetCustomerByIdInterface.Request,
    ): Promise<GetCustomerByIdInterface.Response> {
        const customerEntity = await this.getCustomerByIdRepository.getById(id);

        if (!customerEntity) {
            return left(new CustomerNotFoundError(id));
        }

        return right(customerEntity);
    }
}
