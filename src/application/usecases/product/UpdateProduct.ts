import {
    GetProductByIdRepository,
    GetProductByNbmRepository,
    GetProductBySkuRepository,
    UpdateProductInterface,
    UpdateProductRepository,
} from '@application/interfaces';
import { left, right } from '@core/either';
import { ProductEntity } from '@core/entities';
import {
    NbmAlreadyExistsError,
    ProductNotFoundError,
    SkuAlreadyExistsError,
} from '@core/errors';

export class UpdateProduct implements UpdateProductInterface {
    constructor(
        private readonly updateProductRepository: UpdateProductRepository,
        private readonly getProductByIdRepository: GetProductByIdRepository,
        private readonly getProductBySkuRepository: GetProductBySkuRepository,
        private readonly getProductByNbmRepository: GetProductByNbmRepository,
    ) {}

    async execute(
        request: UpdateProductInterface.Request,
    ): Promise<UpdateProductInterface.Response> {
        const productEntity = await this.getProductByIdRepository.getById(
            request.id,
        );

        if (!productEntity) {
            return left(new ProductNotFoundError(request.id));
        }

        if (request.data.sku) {
            const skuAlreadyExists =
                await this.getProductBySkuRepository.getBySku(request.data.sku);

            if (skuAlreadyExists) {
                return left(new SkuAlreadyExistsError(request.data.sku));
            }
        }

        if (request.data.nbm) {
            const nbmAlreadyExists =
                await this.getProductByNbmRepository.getByNbm(request.data.nbm);

            if (nbmAlreadyExists) {
                return left(new NbmAlreadyExistsError(request.data.nbm));
            }
        }

        const updateProductEntity: ProductEntity = {
            ...productEntity,
            ...request.data,
        };

        await this.updateProductRepository.update(updateProductEntity);

        return right(updateProductEntity);
    }
}
