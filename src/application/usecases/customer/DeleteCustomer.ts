import {
    DeleteCustomerInterface,
    DeleteCustomerRepository,
    GetCustomerByIdRepository,
} from '@application/interfaces';
import { left, right } from '@core/either';
import { CustomerNotFoundError } from '@core/errors';

export class DeleteCustomer implements DeleteCustomerInterface {
    constructor(
        private readonly deleteCustomerRepository: DeleteCustomerRepository,
        private readonly getCustomerByIdRepository: GetCustomerByIdRepository,
    ) {}

    public async execute(
        id: DeleteCustomerInterface.Request,
    ): Promise<DeleteCustomerInterface.Response> {
        const customer = await this.getCustomerByIdRepository.getById(id);

        if (!customer) {
            return left(new CustomerNotFoundError(id));
        }

        await this.deleteCustomerRepository.delete(id);

        return right(null);
    }
}
