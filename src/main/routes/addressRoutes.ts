import { expressRouteAdapter } from '@main/adapter';
import { AddressControllerFactory } from '@main/factories';
import { Router } from 'express';

export const addressRoutes = (router: Router) => {
    router.post(
        '/address',
        expressRouteAdapter(AddressControllerFactory.create()),
    );
    router.get(
        '/address/:id',
        expressRouteAdapter(AddressControllerFactory.getById()),
    );
    router.get('/address', expressRouteAdapter(AddressControllerFactory.get()));
    router.patch(
        '/address/:id',
        expressRouteAdapter(AddressControllerFactory.update()),
    );
};
