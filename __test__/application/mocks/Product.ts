import {
    CreateProductInterface,
    GetProductByIdInterface,
    GetProductByIdRepository,
    GetProductByNbmRepository,
    GetProductBySkuInterface,
    GetProductBySkuRepository,
    UpdateProductInterface,
    UpdateProductRepository,
} from '@application/interfaces';
import { left, right } from '@core/either';
import {
    NbmAlreadyExistsError,
    ProductNotFoundError,
    SkuAlreadyExistsError,
} from '@core/errors';
import { makeFakeProduct } from '@test/core/entities';

/* eslint-disable @typescript-eslint/no-unused-vars */
export class CreateProductStub implements CreateProductInterface {
    async execute(
        request: CreateProductInterface.Request,
    ): Promise<CreateProductInterface.Response> {
        return right(makeFakeProduct());
    }
}

export class GetProductByIdStub implements GetProductByIdInterface {
    constructor(
        private readonly getProductByIdRepository: GetProductByIdRepository,
    ) {}

    async execute(
        id: GetProductByIdInterface.Request,
    ): Promise<GetProductByIdInterface.Response> {
        const product = await this.getProductByIdRepository.getById(id);

        if (!product) {
            return left(new ProductNotFoundError(id));
        }

        return right(makeFakeProduct());
    }
}

export class GetProductBySkuStub implements GetProductBySkuInterface {
    async execute(sku: string): Promise<GetProductBySkuInterface.Response> {
        return right(makeFakeProduct());
    }
}

export class UpdateProductStub implements UpdateProductInterface {
    constructor(
        private readonly updateProductRepository: UpdateProductRepository,
        private readonly getProductByIdRepository: GetProductByIdRepository,
        private readonly getProductBySkuRepository: GetProductBySkuRepository,
        private readonly getProductByNbmRepository: GetProductByNbmRepository,
    ) {}

    async execute(
        request: UpdateProductInterface.Request,
    ): Promise<UpdateProductInterface.Response> {
        const product = await this.getProductByIdRepository.getById(request.id);

        if (!product) {
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

        await this.updateProductRepository.update({
            ...product,
            name: 'new name',
        });

        return right(makeFakeProduct());
    }
}
