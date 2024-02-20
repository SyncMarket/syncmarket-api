import { CustomerAddress, CustomerDTO } from '@core/interfaces';

export class CustomerEntity {
    public readonly id: string;
    public addresses: CustomerAddress[];
    public cartId: string | null;
    public name: string;
    public email: string;
    public document: string;
    public birthDate: Date;
    public phoneNumber: string;
    public isActive: boolean;
    public isDeleted: boolean;
    public createdAt: Date;
    public updatedAt: Date | null;
    public deletedAt: Date | null;

    constructor(props: CustomerDTO) {
        this.addresses = [];
        this.cartId = props.cartId;
        this.name = props.name;
        this.email = props.email;
        this.document = props.document;
        this.birthDate = new Date(props.birthDate);
        this.phoneNumber = props.phoneNumber;
        this.isActive = true;
        this.isDeleted = false;
        this.createdAt = new Date();
        this.updatedAt = null;
        this.deletedAt = null;
    }
}
