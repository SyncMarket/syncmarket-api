import { CreateAddressController } from '@infra/http/controllers';
import { AddressFactory } from '@main/factories';

export class AddressControllerFactory {
    static create(): CreateAddressController {
        const createAddress = AddressFactory.create();
        return new CreateAddressController(createAddress);
    }
}
