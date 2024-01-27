import {
    GetProductInterface,
    GetProductRepository,
} from '@application/interfaces';
import { GetRequest } from '@core/interfaces';

export class GetProduct implements GetProductInterface {
    constructor(private readonly getProductRepository: GetProductRepository) {}

    async execute(
        request: GetProductInterface.Request,
    ): Promise<GetProductInterface.Response> {
        const { page, pageSize } = request;

        const getRequest: GetRequest = {
            page: (page - 1) * pageSize,
            pageSize,
        };

        const { data, total } = await this.getProductRepository.get(getRequest);

        return {
            data: data,
            page: {
                elements: data.length,
                number: request.page,
                totalElements: total,
            },
        };
    }
}
