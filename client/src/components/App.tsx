import { useState, useEffect, useRef } from 'react';
import reactLogo from '@assets/react.svg';
import viteLogo from '/vite.svg';
import '@styles/App.css';

function App() {
  const [count, setCount] = useState(0);
  const refWS = useRef<Nullable<WebSocket>>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:9001`);
    ws.onopen = (_e) => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (e) => {
      console.log('Message from server:', e.data);
    }
    
    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    refWS.current = ws;

    return () => {
      ws.close();
      refWS.current = null;
    }
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => {
          if(refWS.current){
            const joinRoomMsg = {
              Type: 'joinRoom',
              UserId: 'hello',
              RoomId: 'room1'
            };
            refWS.current.send(JSON.stringify(joinRoomMsg));
          }
          // const ws = new WebSocket(`ws://localhost:9001`);
          // ws.onopen = (e) => {
          //   console.log('WebSocket connection established');
          //   ws.send("Test");
          // };
          // ws.onmessage = (e) => {
          //   console.log('Message from server:', e.data);
          // }
          
          // ws.onclose = () => {
          //     console.log('WebSocket connection closed');
          // };

          // ws.onerror = (error) => {
          //     console.error('WebSocket error:', error);
          // };

          // setTimeout(() => {
          //   console.log('Trying to close the websocket...');
          //   ws.close();
          // }, 10*1000);
        }} >
          Test web socket
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
