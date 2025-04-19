import { Router } from 'express';
import path from 'path';
import { IEsmUtility } from '@infrastructures/interfaces/IEsmUtility.js';
import { EsmUtility } from '@infrastructures/implements/EsmUtility.js';

export class DefaultRoutes {
    public router: Router;
    private _esmUtility: IEsmUtility;

    constructor() {
        this.router = Router();

        // Initialize the ESM utility
        this._esmUtility = new EsmUtility();

        // Initialize routes
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // Define API routes here
        this.router.get('/api', (req, res) => {
            res.json({ message: 'Hello from the API!' });
        });

        const dirName = this._esmUtility.GetDirName(import.meta.url);

        // Serve the index.html file for any other requests (for SPA routing)
        this.router.get('*', (req, res) => {
            res.sendFile(path.join(dirName, '../dist', 'index.html'));
        });
    }
}