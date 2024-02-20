import 'module-alias/register';
import { ENV } from '@core/config';
import { mongoDB } from '@infra/database/mongodb';
import { setUpApp } from '@main/config';

mongoDB
    .connect()
    .then(async () => {
        const app = setUpApp();

        app.listen(ENV.PORT);
    })
    .catch(console.error);
