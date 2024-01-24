import {
    CreateProductRepository,
    GetProductBySkuRepository,
} from '@application/interfaces';

export abstract class ProductRepository
    implements CreateProductRepository, GetProductBySkuRepository
{
    abstract create(
        productDTO: CreateProductRepository.Request,
    ): Promise<CreateProductRepository.Response>;

    abstract getBySku(
        sku: GetProductBySkuRepository.Request,
    ): Promise<GetProductBySkuRepository.Response>;
}
