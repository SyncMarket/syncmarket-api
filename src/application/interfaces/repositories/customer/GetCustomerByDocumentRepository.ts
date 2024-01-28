import { CustomerEntity } from '@core/entities';

export interface GetCustomerByDocumentRepository {
    getByDocument(
        document: GetCustomerByDocumentRepository.Request,
    ): Promise<GetCustomerByDocumentRepository.Response>;
}

export namespace GetCustomerByDocumentRepository {
    export type Request = string;
    export type Response = CustomerEntity | null;
}
