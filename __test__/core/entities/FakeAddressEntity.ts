import { AddressDTO } from '@core/interfaces';
import { AddressEntity } from '@core/entities';

export const makeFakeAddressDTO = (): AddressDTO => {
    return {
        street: 'street',
        number: 'number',
        neighborhood: 'neighborhood',
        city: 'city',
        state: 'state',
        country: 'country',
        zipcode: 'zipcode',
        type: 'HOME',
        complement: 'complement',
        phoneNumber: 'phoneNumber',
    };
};

export const makeFakeAddressEntity = (): AddressEntity => {
    const addressDTO = makeFakeAddressDTO();

    return new AddressEntity(addressDTO);
};
