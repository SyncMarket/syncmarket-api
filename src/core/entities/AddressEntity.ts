import { AddressDTO } from '@core/interfaces';

export class AddressEntity {
    public readonly id: string;
    public customerId: string;
    public street: string;
    public city: string;
    public state: string;
    public country: string;
    public zipcode: string;
    public neighborhood: string;
    public number: string;
    public complement: string;
    public type: string;
    public phoneNumber: string;
    public createdAt: Date;
    public updatedAt: Date;
    public isMain: boolean;

    constructor(addressDTO: AddressDTO) {
        this.customerId = addressDTO.customerId;
        this.street = addressDTO.street;
        this.city = addressDTO.city;
        this.state = addressDTO.state;
        this.country = addressDTO.country;
        this.zipcode = addressDTO.zipcode;
        this.neighborhood = addressDTO.neighborhood;
        this.number = addressDTO.number;
        this.complement = addressDTO.complement;
        this.type = addressDTO.type;
        this.phoneNumber = addressDTO.phoneNumber;
        this.createdAt = new Date();
        this.updatedAt = null;
        this.isMain = true;
    }
}
