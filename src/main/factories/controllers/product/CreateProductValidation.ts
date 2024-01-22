import { ValidationComposite } from '@infra/http/validations';

export const makeCreateProductValidation = (): ValidationComposite => {
    return new ValidationComposite([], 'body');
};
