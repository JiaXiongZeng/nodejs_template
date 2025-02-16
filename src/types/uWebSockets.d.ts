declare module 'uWebSockets.js' {
    interface WebSocket<UserData> {
        /**
         * Send object as a JSON string
         * @param obj object to be serialized
         */
        sendObject(obj: unknown): void;
    }
}

export {};