import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { configMiddleware, IConfigSettings } from '@middlewares/ConfigMiddleware.js';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from '@infrastructures/di/inversify.config.js';
import { TYPES } from '@infrastructures/di/types.js';
import { UserRoutes } from '@routes/UserRoutes.js';
import { DefaultRoutes } from '@routes/DefaultRoutes.js';
import { CustomAuthProvider } from '@middlewares/CustomerAuthProvider.js';
import { RedisSessionMiddleware } from '@middlewares/RedisSessionMiddleware.js';
import { IEsmUtility } from '@infrastructures/interfaces/IEsmUtility.js';
import { EsmUtility } from '@infrastructures/implements/EsmUtility.js';
import { ErrorMiddleware } from '@middlewares/ErrorMiddleware.js';

export class WebApp {
    private _app: Application;
    private _configs: IConfigSettings;
    private _esmUtility: IEsmUtility;

    public get app(): Application {
        return this._app;
    }

    public get configs(): IConfigSettings {
        return this._configs;
    }

    constructor() {
        this._app = express();

        // Initialize the ESM utility
        this._esmUtility = new EsmUtility();

        // Initialize the configs
        this._configs = container.get<IConfigSettings>(TYPES.IConfigSettings);

        // Setup middlewares
        this.setupMiddlewares();

        // Setup inversify di library settings
        this.setupInversify();

        // Setup Swagger
        this.setupSwagger();

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
        const dirName = this._esmUtility.GetDirName(import.meta.url);
        this._app.use(express.static(path.join(dirName, './dist')));

        // Fallback to default routes
        const defaultRoutes = new DefaultRoutes();
        this._app.use(defaultRoutes.router);
    }

    private setupSwagger = () => {
        const SWAGGER_ROUTE = '/api-docs';
        const SWAGGER_JSON_URL = `${SWAGGER_ROUTE}.json`;

        // Swagger setup
        const options: swaggerUi.SwaggerOptions ={
            swaggerDefinition: {
                openapi: "3.0.0",
                info: {
                    title: "API Documentation",
                    version: "1.0.0",
                    description: `API Documentation for the application<br/>
                    **Swagger JSON**: [Download API Schema](${SWAGGER_JSON_URL})`
                },
                servers:[
                    {
                        url: '/api',
                        description: 'Base API URL'
                    }
                ],
                components: {
                    schemas: {}
                }
            },            
            apis: [
                // Folder of controllers
                "./src/controllers/*.ts", 

                // Folder of parameters or viewModels
                "./src/controllers/models/**/*.ts",

                // Folder of enums
                "./src/common/enums/**/*.ts"
            ]
        };
        
        const swaggerUiOptions: swaggerUi.SwaggerUiOptions = {
            //explorer: true, // Enables search bar
            swaggerOptions: {
                deepLinking: true,
                defaultModelsExpandDepth: 2,      // Expand models to depth 2
                defaultModelExpandDepth: 2,       // Expand individual model properties to depth 2
                defaultModelRendering: 'example', // Display schemas as examples or models
                displayRequestDuration: true,     // Display request duration
            }
        };
        
        // Setting up swagger ui
        const swaggerSpec = swaggerJsdoc(options);
        this._app.use(SWAGGER_ROUTE, swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

        // Setting up OpenAPI schema json file
        this._app.get(SWAGGER_JSON_URL, (req, res) => {
            res.header('Content-Type', 'application/json');
            res.send(JSON.stringify(swaggerSpec, null, 2));
        });
    }

    private setupInversify = () => {
        const server = new InversifyExpressServer(container, null, { rootPath: "/api" }, this._app, CustomAuthProvider);
        server.setConfig((app) => {
            console.log("Inversify middleware setup complete.");
        });

        server.setErrorConfig((app) => {
            app.use(ErrorMiddleware);
        });

        // Build the Inversify app and replace the raw Express app
        this._app = server.build();
    }
}