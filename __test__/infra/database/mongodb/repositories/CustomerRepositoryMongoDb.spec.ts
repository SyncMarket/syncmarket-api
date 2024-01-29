import {
    CustomerModelMongoDb,
    CustomerRepositoryMongoDb,
    mongoDB,
} from '@infra/database/mongodb';
import { Collection } from 'mongodb';
import { makeFakeCustomerMongo } from '@test/infra/database/mongodb';

describe('CustomerRepositoryMongoDb', () => {
    let customerCollection: Collection<CustomerModelMongoDb>;

    beforeAll(async () => {
        mongoDB.database = mongoDB.client.db('syncmarket_test');

        customerCollection = CustomerRepositoryMongoDb.getCollection();

        await mongoDB.connect();
    });

    afterAll(async () => {
        await mongoDB.disconnect();
    });

    beforeEach(async () => {
        await customerCollection.deleteMany({});
    });

    describe('createCustomer', () => {
        it('should create a customer and return success', async () => {
            const customerRepository = new CustomerRepositoryMongoDb();

            const customer = makeFakeCustomerMongo();

            const response = await customerRepository.create(customer);

            expect(response).toBeTruthy();

            const count = await customerCollection.countDocuments();

            expect(count).toBe(1);
        });
    });

    describe('getCustomerByDocument', () => {
        it('should return a customer on success', async () => {
            const customerRepository = new CustomerRepositoryMongoDb();

            const customerEntity = makeFakeCustomerMongo();

            const { id } = await customerRepository.create(customerEntity);

            const customer = await customerRepository.getByDocument(
                customerEntity.document,
            );

            expect(customer).toEqual({ ...customerEntity, id });
        });
    });

    describe('getCustomerByEmail', () => {
        it('should return a customer on success', async () => {
            const customerRepository = new CustomerRepositoryMongoDb();

            const customerEntity = makeFakeCustomerMongo();

            const { id } = await customerRepository.create(customerEntity);

            const customer = await customerRepository.getByEmail(
                customerEntity.email,
            );

            expect(customer).toEqual({ ...customerEntity, id });
        });
    });

    describe('getCustomerById', () => {
        it('should return a customer on success', async () => {
            const customerRepository = new CustomerRepositoryMongoDb();

            const customerEntity = makeFakeCustomerMongo();

            const { id } = await customerRepository.create(customerEntity);

            const customer = await customerRepository.getById(id);

            expect(customer).toBeTruthy();
            expect(customer).toEqual({ ...customerEntity, id });
        });
    });

    describe('updateCustomer', () => {
        it('should update a customer and return success', async () => {
            const customerRepository = new CustomerRepositoryMongoDb();

            const customerEntity = makeFakeCustomerMongo();

            const { id } = await customerRepository.create(customerEntity);

            const updateRequest = {
                ...customerEntity,
                name: 'new name',
                id,
            };

            await customerRepository.update({
                id,
                data: updateRequest,
            });

            const customerUpdated = await customerRepository.getById(id);

            expect(customerUpdated).toEqual(updateRequest);
        });
    });
});
