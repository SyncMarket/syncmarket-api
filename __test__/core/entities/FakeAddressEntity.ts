import { AddressDTO } from '@core/interfaces';
import { AddressEntity } from '@core/entities';

export const makeFakeAddressDTO = (): AddressDTO => {
    return {
        customerId: 'customerId',
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
        isMain: true,
    };
};

export const makeFakeAddressEntity = (): AddressEntity => {
    const addressDTO = makeFakeAddressDTO();
    return new AddressEntity(addressDTO);
};
