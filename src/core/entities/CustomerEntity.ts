import { CustomerDTO } from '@core/interfaces';

export class CustomerEntity {
    public readonly id: string;
    public addresId: string;
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
        Object.assign(this, props);
    }
}
