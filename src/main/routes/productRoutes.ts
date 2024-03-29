import { expressRouteAdapter } from '@main/adapter';
import {
    makeCreateProductController,
    makeGetProductByIdController,
    makeGetProductController,
    makeUpdateProductController,
} from '@main/factories/controllers';
import { Router } from 'express';

export const productRoutes = (router: Router): void => {
    router.post('/product', expressRouteAdapter(makeCreateProductController()));
    router.patch(
        '/product/:id',
        expressRouteAdapter(makeUpdateProductController()),
    );
    router.get(
        '/product/:id',
        expressRouteAdapter(makeGetProductByIdController()),
    );
    router.get('/product', expressRouteAdapter(makeGetProductController()));
};
