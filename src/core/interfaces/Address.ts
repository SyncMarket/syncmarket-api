export interface AddressDTO {
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

export interface Address extends AddressDTO {
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
}
