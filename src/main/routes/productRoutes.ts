import { expressRouteAdapter } from '@main/adapter';
import {
    makeCreateProductController,
    makeUpdateProductController,
} from '@main/factories/controllers';
import { Router } from 'express';

export const productRoutes = (router: Router): void => {
    router.post('/product', expressRouteAdapter(makeCreateProductController()));
    router.patch(
        '/product/:id',
        expressRouteAdapter(makeUpdateProductController()),
    );
};
