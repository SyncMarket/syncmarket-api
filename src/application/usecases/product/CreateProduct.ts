import {
    CreateProductInterface,
    CreateProductRepository,
    GetProductByNbmRepository,
    GetProductBySkuRepository,
} from '@application/interfaces';
import { left, right } from '@core/either';
import { ProductEntity } from '@core/entities';
import { NbmAlreadyExistsError, SkuAlreadyExistsError } from '@core/errors';

export class CreateProduct implements CreateProductInterface {
    constructor(
        private readonly createProductRepository: CreateProductRepository,
        private readonly getProductBySkuRepository: GetProductBySkuRepository,
        private readonly getProductByNbmRepository: GetProductByNbmRepository,
    ) {}

    async execute(
        request: CreateProductInterface.Request,
    ): Promise<CreateProductInterface.Response> {
        const skuAlreadyExists = await this.getProductBySkuRepository.getBySku(
            request.sku,
        );

        if (skuAlreadyExists) {
            return left(new SkuAlreadyExistsError(request.sku));
        }

        const nbmAlreadyExists = await this.getProductByNbmRepository.getByNbm(
            request.nbm,
        );

        if (nbmAlreadyExists) {
            return left(new NbmAlreadyExistsError(request.nbm));
        }

        const productEntity = new ProductEntity(request);

        const { id } = await this.createProductRepository.create(productEntity);

        return right({ ...productEntity, id });
    }
}
