import { UseCaseError } from '@core/errors';

export class ProductNotFoundError extends Error implements UseCaseError {
    constructor(id: string) {
        super(`Product with id [${id}] not found`);
    }
}
