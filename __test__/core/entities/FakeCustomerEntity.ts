import { CustomerEntity } from '@core/entities';
import { CustomerDTO } from '@core/interfaces';

export const makeFakeCustomerDTO = (): CustomerDTO => {
    const customerDTO: CustomerDTO = {
        address: null,
        birthDate: new Date(0),
        cartId: null,
        document: 'document',
        email: 'email',
        password: 'password',
        name: 'name',
        phoneNumber: 'phoneNumber',
    };
    return customerDTO;
};

export const makeFakeCustomerEntity = (): CustomerEntity => {
    const customerDTO = makeFakeCustomerDTO();
    const customerEntity = new CustomerEntity(customerDTO);
    customerEntity.createdAt = new Date(0);
    return customerEntity;
};
