import {
    CreateAddressController,
    GetAddressByIdController,
} from '@infra/http/controllers';
import { AddressFactory } from '@main/factories';

export class AddressControllerFactory {
    static create(): CreateAddressController {
        const createAddress = AddressFactory.create();
        return new CreateAddressController(createAddress);
    }

    static getById(): GetAddressByIdController {
        const getAddressById = AddressFactory.getById();
        return new GetAddressByIdController(getAddressById);
    }
}
