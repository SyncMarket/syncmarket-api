import {
    CreateProductInterface,
    GetProductByIdInterface,
    GetProductBySkuInterface,
} from '@application/interfaces';
import { right } from '@core/either';
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
    async execute(
        id: GetProductByIdInterface.Request,
    ): Promise<GetProductByIdInterface.Response> {
        return right(makeFakeProduct());
    }
}

export class GetProductBySkuStub implements GetProductBySkuInterface {
    async execute(sku: string): Promise<GetProductBySkuInterface.Response> {
        return right(makeFakeProduct());
    }
}
