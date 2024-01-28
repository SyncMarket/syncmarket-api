export interface CustomerDTO {
    name: string;
    email: string;
    password: string;
    document: string;
    birthDate: Date;
    phoneNumber: string;
    addressId: string;
    cartId: string | null;
}

export interface Customer extends Omit<CustomerDTO, 'password'> {
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}
