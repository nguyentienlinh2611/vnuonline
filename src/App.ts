import "reflect-metadata";
import {Request, Response} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import {createConnection} from "typeorm";
import * as appConfig from "./common/app-config";
import AppRoutes from "./routers";
import {isUserAuthenticated} from "./controllers/AuthorizeController";
/**
 * Create Express server.
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Primary app routes.
 */

/**
 * Create connection to DB using configuration provided in
 * appconfig file.
 */
createConnection(appConfig.dbOptions).then(async connection => {
    console.log("Connected to DB");
    AppRoutes.forEach(route => {
        if( route.method) {
            app[route.method](route.path, ...route.middleware, (request: Request, response: Response, next: Function) => {
                route.action(request, response)
                    .then(() => next)
                    .catch(err => next(err));
            });
        }
    });
}).catch(error => console.log("TypeORM connection error: ", error));

app.use('/static',express.static('public'));

export default app;
