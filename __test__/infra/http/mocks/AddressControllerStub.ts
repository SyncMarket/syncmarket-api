import { CreateAddressInterface } from '@application/interfaces';
import { CreateAddressController } from '@infra/http/controllers';
import { AddressRepository } from '@application/repositories';
import { AddressStub } from '@test/application';

type ControllerStubType<TController, TUsecase> = {
    controller: TController;
    usecase: TUsecase;
    repository?: AddressRepository;
};

export class AddressControllerStub {
    static create(): ControllerStubType<
        CreateAddressController,
        CreateAddressInterface
    > {
        const { usecase } = AddressStub.createStub();
        const controller = new CreateAddressController(usecase);
        return { usecase, controller };
    }
}
