import { WebApp } from 'WebApp.js';
import { WebSocketApp } from 'WebSocketApp.js';
import { EOL } from 'os';

// Start the web server
const { app: webApp, configs: webConfigs } = new WebApp();
const WEB_PORT = webConfigs.Port;
webApp.listen(WEB_PORT, () => {
    console.log(`Web server is listening to port ${WEB_PORT}`);
});

// Start the web socket server
const { app: wsApp, configs: wsConfigs } = new WebSocketApp();
const WS_PORT = wsConfigs.WebSocket.Port;
wsApp.listen(WS_PORT, (token) => {
    if (token) {
        console.log(`Web socket server is listening to port ${WS_PORT}`);
    } else {
        console.log(`Web socket server is failed to listen to port ${WS_PORT}`);
    }
});

//To prevent the process shutdown by uncaught exception
process.on('uncaughtException', err => {
    console.error(`Uncaught Exception:${EOL}`, err);
    //Don't call process.exit(1) unless absolutely necessary
});

//To prevent the process shutdown by uncaught reason
process.on('unhandledRejection', reason => {
    console.error(`Unhandle Rejection:${EOL}`, reason);
    //Don't call process.exit(1) unless absolutely necessary
});