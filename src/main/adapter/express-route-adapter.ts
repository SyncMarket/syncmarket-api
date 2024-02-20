import { BaseController } from '@infra/http/controllers';
import { HttpRequest } from '@infra/http/interfaces';
import { Request, Response } from 'express';

export const expressRouteAdapter =
    (controller: BaseController) => async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            body: req.body,
            params: req.params,
            headers: req.headers,
        };

        const httpResponse = await controller.handle(httpRequest);

        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            res.status(httpResponse.statusCode).json(httpResponse.body);
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body,
            });
        }
    };
