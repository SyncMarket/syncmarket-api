import { UseCaseError } from '@core/errors';

export class DocumentAlreadyExistsError extends Error implements UseCaseError {
    constructor(document: string) {
        super(`Document [${document}] already exists`);
    }
}
