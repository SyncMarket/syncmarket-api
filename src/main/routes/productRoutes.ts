import { expressRouteAdapter } from '@main/adapter';
import { makeCreateProductController } from '@main/factories/controllers';
import { Router } from 'express';

export const productRoutes = (router: Router): void => {
    router.post(
        '/products',
        expressRouteAdapter(makeCreateProductController()),
    );
};
