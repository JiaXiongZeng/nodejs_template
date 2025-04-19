declare module 'inversify' {
    interface Container {
        /**
         * Register ORM service to service container
         */
        addORM(): void;
        /**
         * Register AutoMapper service to service container
         */
        addAutoMapper(): void;
    }
}

export {};