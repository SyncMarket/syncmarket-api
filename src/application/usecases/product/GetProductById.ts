import {
    GetProductByIdInterface,
    GetProductByIdRepository,
} from '@application/interfaces';
import { left, right } from '@core/either';
import { ProductNotFoundError } from '@core/errors';

export class GetProductById implements GetProductByIdInterface {
    constructor(
        private readonly getProductByIdRepository: GetProductByIdRepository,
    ) {}

    async execute(
        productId: GetProductByIdInterface.Request,
    ): Promise<GetProductByIdInterface.Response> {
        const productEntity =
            await this.getProductByIdRepository.getById(productId);

        if (!productEntity) {
            return left(new ProductNotFoundError(productId));
        }

        return right(productEntity);
    }
}
