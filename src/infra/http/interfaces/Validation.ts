import { Either } from '@core/either';

export interface Validation {
    validate(input: unknown): Either<Error, null>;
}
