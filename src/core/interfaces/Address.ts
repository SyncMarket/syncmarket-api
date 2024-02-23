export interface AddressDTO {
    customerId: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    neighborhood: string;
    number: string;
    complement: string;
    type: string;
    phoneNumber: string;
    isMain: boolean;
}

export interface Address extends Omit<AddressDTO, 'customerId'> {
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
}
