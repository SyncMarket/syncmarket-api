import { UseCaseError } from '@core/errors';

export class EmailAlreadyExistsError extends Error implements UseCaseError {
    constructor(email: string) {
        super(`Email [${email}] already exists`);
    }
}
