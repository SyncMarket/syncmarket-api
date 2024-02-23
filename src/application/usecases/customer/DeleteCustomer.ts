import { DeleteCustomerInterface } from '@application/interfaces';
import { CustomerRepository } from '@application/repositories';
import { left, right } from '@core/either';
import { CustomerNotFoundError } from '@core/errors';

export class DeleteCustomer implements DeleteCustomerInterface {
    constructor(private readonly customerRepository: CustomerRepository) {}

    public async execute(
        id: DeleteCustomerInterface.Request,
    ): Promise<DeleteCustomerInterface.Response> {
        const customer = await this.customerRepository.getById(id);
        if (!customer) {
            return left(new CustomerNotFoundError(id));
        }
        await this.customerRepository.delete(id);
        return right(null);
    }
}
