import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import config from 'config';
import { UserRoutes } from '@routes/UserRoutes';

interface ConfigSettings {
    readonly PORT: number;
}

export class App {
    public app: Application;
    public configs!: ConfigSettings;

    constructor() {
        this.app = express();
        this.initializeConfigs();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private initializeConfigs = () => {
        this.configs = {
            PORT: config.get<number>("port")
        }
    }

    private initializeMiddlewares = () => {
        // Middleware to enable CORS
        this.app.use(cors());
        // Middleware to parse JOSN bodies
        this.app.use(express.json());
        // Middleware to parse URL-encoded bodies
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes = () => {
        const userRoutes = new UserRoutes();
        this.app.use("/api/users", userRoutes.router);


        // Define API routes here
        this.app.get('/api', (req, res) => {
            res.json({ message: 'Hello from the API!' });
        });

        // Serve static files from the dist directory
        this.app.use(express.static(path.join(__dirname, './dist')));

        // Serve the index.html file for any other requests (for SPA routing)
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, './dist', 'index.html'));
        });
    }

    public start = () => {
        // Start the server
        this.app.listen(this.configs.PORT, () => {
            console.log(`Server is running on http://localhost:${this.configs.PORT}`);
        });
    }
}

//Run App backend
const app = new App();
app.start();