import { GetAddressesInterface } from '@application/interfaces';
import { AddressRepository } from '@application/repositories';

export class GetAddresses implements GetAddressesInterface {
    constructor(private readonly addressRepository: AddressRepository) {}

    public async execute(
        request: GetAddressesInterface.Request,
    ): Promise<GetAddressesInterface.Response> {
        const { page, pageSize } = request;

        const response = await this.addressRepository.get({
            page: (page - 1) * pageSize,
            pageSize,
        });

        return {
            data: response.data,
            page: {
                ...response.page,
                number: page,
            },
        };
    }
}
