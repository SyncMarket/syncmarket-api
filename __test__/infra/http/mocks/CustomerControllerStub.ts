import {
    CreateCustomerController,
    DeleteCustomerController,
    GetCustomerByIdController,
    UpdateCustomerController,
} from '@infra/http/controllers';
import { CustomerStub } from '@test/application';
import {
    CreateCustomerInterface,
    DeleteCustomerInterface,
    GetCustomerByIdInterface,
    UpdateCustomerInterface,
} from '@application/interfaces';
import { ControllerStubType } from './ControllerStub';
import {
    InMemoryAddressRepository,
    InMemoryCustomerRepository,
} from '@test/application/repositories';

interface CustomerControllerStubType<TController, TUsecase>
    extends ControllerStubType<
        TController,
        TUsecase,
        InMemoryCustomerRepository
    > {
    addressRepository?: InMemoryAddressRepository;
}

export class CustomerControllerStub {
    static create(): CustomerControllerStubType<
        CreateCustomerController,
        CreateCustomerInterface
    > {
        const { usecase, repository } = CustomerStub.create();
        const controller = new CreateCustomerController(usecase);
        return { usecase, controller, repository };
    }

    static getById(): CustomerControllerStubType<
        GetCustomerByIdController,
        GetCustomerByIdInterface
    > {
        const { usecase, repository } = CustomerStub.getById();
        const controller = new GetCustomerByIdController(usecase);
        return { usecase, repository, controller };
    }

    static update(): CustomerControllerStubType<
        UpdateCustomerController,
        UpdateCustomerInterface
    > {
        const { repository, usecase } = CustomerStub.update();
        const controller = new UpdateCustomerController(usecase);
        return { usecase, repository, controller };
    }

    static delete(): CustomerControllerStubType<
        DeleteCustomerController,
        DeleteCustomerInterface
    > {
        const { repository, usecase } = CustomerStub.delete();
        const controller = new DeleteCustomerController(usecase);
        return { usecase, repository, controller };
    }
}
