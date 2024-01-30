import {
    GetCustomersInterface,
    GetCustomersRepository,
} from '@application/interfaces';

export class GetCustomers implements GetCustomersInterface {
    constructor(
        private readonly getCustomersRepository: GetCustomersRepository,
    ) {}

    async execute(
        request: GetCustomersInterface.Request,
    ): Promise<GetCustomersInterface.Response> {
        const { page, pageSize } = request;

        const response = await this.getCustomersRepository.get({
            page: (page - 1) * pageSize,
            pageSize,
        });

        return response;
    }
}
