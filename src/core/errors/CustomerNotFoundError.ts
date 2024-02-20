import { UseCaseError } from '@core/errors';

export class CustomerNotFoundError extends Error implements UseCaseError {
    constructor(id: string) {
        super(`Customer with id [${id}] not found`);
    }
}
