import { expressRouteAdapter } from '@main/adapter';
import { AddressControllerFactory } from '@main/factories';
import { Router } from 'express';

export const addressRoutes = (router: Router) => {
    router.post(
        '/address',
        expressRouteAdapter(AddressControllerFactory.create()),
    );
    router.post(
        '/address/:id',
        expressRouteAdapter(AddressControllerFactory.getById()),
    );
};
