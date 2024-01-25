import {
    CreateProductRepository,
    GetProductByIdRepository,
    GetProductByNbmRepository,
    GetProductBySkuRepository,
    UpdateProductRepository,
} from '@application/interfaces';

export abstract class ProductRepository
    implements
        CreateProductRepository,
        GetProductBySkuRepository,
        GetProductByNbmRepository,
        UpdateProductRepository,
        GetProductByIdRepository
{
    abstract create(
        productDTO: CreateProductRepository.Request,
    ): Promise<CreateProductRepository.Response>;

    abstract getBySku(
        sku: GetProductBySkuRepository.Request,
    ): Promise<GetProductBySkuRepository.Response>;

    abstract getByNbm(
        nbm: GetProductByNbmRepository.Request,
    ): Promise<GetProductByNbmRepository.Response>;

    abstract update(
        request: UpdateProductRepository.Request,
    ): Promise<UpdateProductRepository.Response>;

    abstract getById(
        id: GetProductByIdRepository.Request,
    ): Promise<GetProductByIdRepository.Response>;
}
