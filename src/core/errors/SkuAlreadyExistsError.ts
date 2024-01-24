import { UseCaseError } from '@core/errors';

export class SkuAlreadyExistsError extends Error implements UseCaseError {
    constructor(sku: string) {
        super(`Sku ${sku} already exists`);
    }
}
