import { Validation } from '@infra/http/interfaces';

export class ValidationComposite implements Validation {
    constructor(
        private readonly validations: Validation[],
        private readonly segment: string,
    ) {}

    validate(request: unknown): Error | null {
        const input = request[this.segment];

        return this.validations.reduce(
            (error: Error | null, validation: Validation) =>
                error || validation.validate(input),
            null,
        );
    }
}
