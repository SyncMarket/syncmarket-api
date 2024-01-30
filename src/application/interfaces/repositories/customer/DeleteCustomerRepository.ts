export interface DeleteCustomerRepository {
    delete(
        id: DeleteCustomerRepository.Request,
    ): Promise<DeleteCustomerRepository.Response>;
}

export namespace DeleteCustomerRepository {
    export type Request = string;
    export type Response = void;
}
