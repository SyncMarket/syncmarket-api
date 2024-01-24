import {
    CreateProductRepository,
    GetProductByNbmRepository,
    GetProductBySkuRepository,
} from '@application/interfaces';

export abstract class ProductRepository
    implements
        CreateProductRepository,
        GetProductBySkuRepository,
        GetProductByNbmRepository
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
}
