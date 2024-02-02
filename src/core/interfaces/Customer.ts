import { AddressDTO } from './Address';

export interface CustomerAddress extends AddressDTO {
    id: string;
}

export interface CustomerDTO {
    name: string;
    email: string;
    password: string;
    document: string;
    birthDate: Date;
    phoneNumber: string;
    address: CustomerAddress | null;
    cartId: string | null;
}

export interface Customer extends Omit<CustomerDTO, 'password' | 'address'> {
    id: string;
    addresses: CustomerAddress[];
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}
