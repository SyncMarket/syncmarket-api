import {
    GetCustomerByDocumentRepository,
    GetCustomerByEmailRepository,
    GetCustomerByIdRepository,
    UpdateCustomerInterface,
    UpdateCustomerRepository,
} from '@application/interfaces';
import { left, right } from '@core/either';
import { CustomerEntity } from '@core/entities';
import {
    CustomerNotFoundError,
    DocumentAlreadyExistsError,
    EmailAlreadyExistsError,
} from '@core/errors';

export class UpdateCustomer implements UpdateCustomerInterface {
    constructor(
        private readonly updateCustomerRepository: UpdateCustomerRepository,
        private readonly getCustomerByIdRepository: GetCustomerByIdRepository,
        private readonly getCustomerByEmailRepository: GetCustomerByEmailRepository,
        private readonly getCustomerByDocumentRepository: GetCustomerByDocumentRepository,
    ) {}

    async execute(
        request: UpdateCustomerInterface.Request,
    ): Promise<UpdateCustomerInterface.Response> {
        const { id, data } = request;

        const customerEntity = await this.getCustomerByIdRepository.getById(id);

        if (!customerEntity) {
            return left(new CustomerNotFoundError(id));
        }

        if (data.document) {
            const documentAlreadyExists =
                await this.getCustomerByDocumentRepository.getByDocument(
                    data.document,
                );

            if (documentAlreadyExists) {
                return left(new DocumentAlreadyExistsError(data.document));
            }
        }

        if (data.email) {
            const emailAlreadyExists =
                await this.getCustomerByEmailRepository.getByEmail(data.email);

            if (emailAlreadyExists) {
                return left(new EmailAlreadyExistsError(data.email));
            }
        }

        const updateCustomerEntity: CustomerEntity = {
            ...customerEntity,
            ...request.data,
        };

        await this.updateCustomerRepository.update({
            data: updateCustomerEntity,
            id,
        });

        return right(updateCustomerEntity);
    }
}
