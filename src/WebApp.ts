import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';

import { configMiddleware, IConfigSettings } from '@middlewares/ConfigMiddleware';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from '@infrastructures/di/inversify.config';
import { TYPES } from '@infrastructures/di/types';
import { UserRoutes } from '@routes/UserRoutes';
import { DefaultRoutes } from '@routes/DefaultRoutes';
import { CustomAuthProvider } from '@middlewares/CustomerAuthProvider';
import { RedisSessionMiddleware } from '@middlewares/RedisSessionMiddleware';

export class WebApp {
    private _app: Application;
    private _configs: IConfigSettings;

    public get app(): Application {
        return this._app;
    }

    public get configs(): IConfigSettings {
        return this._configs;
    }

    constructor() {
        this._app = express();

        // Initialize the configs
        this._configs = container.get<IConfigSettings>(TYPES.IConfigSettings);

        // Setup middlewares
        this.setupMiddlewares();

        // Setup inversify di library settings
        this.setupInversify();

        // Setup routes
        this.setupRoutes();
    }

    private setupMiddlewares = () => {
        // Middleware to enable CORS
        this._app.use(cors());
        // Middleware to parse JOSN bodies
        this._app.use(express.json());
        // Middleware to parse URL-encoded bodies
        this._app.use(express.urlencoded({ extended: true }));
        // Middleware to use config
        this._app.use(configMiddleware(this._configs));
        // Middleware to use session
        this._app.use(async (req, res, next) => {
            //Get the RediesSessionMiddleware from DI container
            const middleware = container.get<RedisSessionMiddleware>(TYPES.RedisSessionMiddleware);
            await middleware.handler(req, res, next);
        });
    }

    private setupRoutes = () => {
        const userRoutes = new UserRoutes();
        this._app.use("/api/users", userRoutes.router);

        // Serve static files from the dist directory
        this._app.use(express.static(path.join(__dirname, './dist')));

        // Fallback to default routes
        const defaultRoutes = new DefaultRoutes();
        this._app.use(defaultRoutes.router);
    }

    private setupInversify = () => {
        const server = new InversifyExpressServer(container, null, { rootPath: "/api" }, this._app, CustomAuthProvider);
        server.setConfig((app) => {
            console.log("Inversify middleware setup complete.");
        });

        // Build the Inversify app and replace the raw Express app
        this._app = server.build();
    }
}