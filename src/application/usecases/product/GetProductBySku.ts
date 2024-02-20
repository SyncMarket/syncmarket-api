import {
    GetProductBySkuInterface,
    GetProductBySkuRepository,
} from '@application/interfaces';
import { left, right } from '@core/either';
import { ProductNotFoundError } from '@core/errors';

export class GetProductBySku implements GetProductBySkuInterface {
    constructor(
        private readonly getProductBySkuRepository: GetProductBySkuRepository,
    ) {}

    async execute(sku: string): Promise<GetProductBySkuInterface.Response> {
        const productEntity =
            await this.getProductBySkuRepository.getBySku(sku);

        if (!productEntity) {
            return left(new ProductNotFoundError(sku));
        }

        return right(productEntity);
    }
}
