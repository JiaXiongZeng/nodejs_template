import { Router } from 'express';
import path from 'path';

export class DefaultRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // Define API routes here
        this.router.get('/api', (req, res) => {
            res.json({ message: 'Hello from the API!' });
        });

        // Serve the index.html file for any other requests (for SPA routing)
        this.router.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../dist', 'index.html'));
        });
    }
}