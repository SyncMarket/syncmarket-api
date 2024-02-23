export interface ControllerStubType<TController, TUsecase, TRepository> {
    controller: TController;
    usecase: TUsecase;
    repository: TRepository;
}
