import { WebApp } from 'WebApp';
import { WebSocketApp } from 'WebSocketApp';

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