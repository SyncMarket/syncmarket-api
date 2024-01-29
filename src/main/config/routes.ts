import { customerRoutes, productRoutes } from '@main/routes';
import express, { Express, Router } from 'express';

export const setUpRoutes = (app: Express): void => {
    const router = Router();
    router.use(express.json());

    app.use('/api', router);
    productRoutes(router);
    customerRoutes(router);
};
