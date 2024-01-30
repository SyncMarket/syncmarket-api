import { expressRouteAdapter } from '@main/adapter';
import {
    makeCreateCustomerController,
    makeGetCustomerByIdController,
    makeUpdateCustomerController,
} from '@main/factories/controllers';
import { Router } from 'express';

export const customerRoutes = (router: Router) => {
    router.post(
        '/customer',
        expressRouteAdapter(makeCreateCustomerController()),
    );
    router.get(
        '/customer/:id',
        expressRouteAdapter(makeGetCustomerByIdController()),
    );
    router.patch(
        '/customer/:id',
        expressRouteAdapter(makeUpdateCustomerController()),
    );
};
