import express, { Express } from 'express';
import { setUpRoutes } from './routes';

export const setUpApp = (): Express => {
    const app = express();
    setUpRoutes(app);

    return app;
};
