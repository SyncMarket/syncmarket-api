export type SutTypes<TUsecase, TRepository> = {
    sut: TUsecase;
    repository: TRepository;
};
