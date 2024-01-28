import { CustomerEntity } from '@core/entities';
import { CustomerDTO } from '@core/interfaces';

export const makeFakeCustomerEntity = (): CustomerEntity => {
    const customerDTO: CustomerDTO = {
        addressId: 'addressId',
        birthDate: new Date(0),
        cartId: 'cartId',
        document: 'document',
        email: 'email',
        name: 'name',
        phoneNumber: 'phoneNumber',
    };

    const customerEntity = new CustomerEntity(customerDTO);

    return { ...customerEntity, id: 'id' };
};
