import { UseCaseError } from '@core/errors';

export class NbmAlreadyExistsError extends Error implements UseCaseError {
    constructor(nbm: string) {
        super(`Nbm [${nbm}] already exists`);
    }
}
