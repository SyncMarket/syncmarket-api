import {
    CreateProductInterface,
    CreateProductRepository,
} from '@application/interfaces';
import { right } from '@core/either';
import { ProductEntity } from '@core/entities';

export class CreateProduct implements CreateProductInterface {
    constructor(
        private readonly createProductRepository: CreateProductRepository,
    ) {}

    async execute(
        request: CreateProductInterface.Request,
    ): Promise<CreateProductInterface.Response> {
        const product = new ProductEntity(request);

        const { id } = await this.createProductRepository.create(product);

        return right({ ...product, id });
    }
}
