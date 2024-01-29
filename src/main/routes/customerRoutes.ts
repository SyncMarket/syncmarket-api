import { expressRouteAdapter } from '@main/adapter';
import { makeCreateCustomerController } from '@main/factories/controllers';
import { Router } from 'express';

export const customerRoutes = (router: Router) => {
    router.post(
        '/customer',
        expressRouteAdapter(makeCreateCustomerController()),
    );
};
