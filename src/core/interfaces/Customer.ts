export interface CustomerDTO {
    name: string;
    email: string;
    document: string;
    birthDate: Date;
    phoneNumber: string;
    addressId: string;
    cartId: string | null;
}

export interface Customer extends CustomerDTO {
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}
