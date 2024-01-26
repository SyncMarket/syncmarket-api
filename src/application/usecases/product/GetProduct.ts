import {
    GetProductInterface,
    GetProductRepository,
} from '@application/interfaces';

export class GetProduct implements GetProductInterface {
    constructor(private readonly getProductRepository: GetProductRepository) {}

    async execute(
        request: GetProductInterface.Request,
    ): Promise<GetProductInterface.Response> {
        const { data, total, elements } =
            await this.getProductRepository.get(request);

        return { data: data, total, elements };
    }
}
