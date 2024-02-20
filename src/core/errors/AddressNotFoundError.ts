import { UseCaseError } from '@core/errors';

export class AddressNotFoundError extends Error implements UseCaseError {
    constructor(id: string) {
        super(`Address with id [${id}] not found`);
    }
}
