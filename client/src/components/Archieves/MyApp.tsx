import { useState, useEffect, useCallback, useRef } from 'react';
import reactLogo from '@assets/react.svg';
import viteLogo from '/vite.svg';
import '@styles/App.css';
import { WebSocketOrdinalMessageUtility as MySocket } from '@utilities/WebSocketOrdinalMessageUtility';
import { ResponseMessage } from '@models/WebSocketMessage';

const MyApp = () => {
  const [count, setCount] = useState(0);
  const refWS = useRef<Nullable<MySocket>>(null);

  useEffect(() => {
    const ws = new MySocket(`ws://${__WS_HOST__}:${__WS_PORT__}`);
    refWS.current = ws;

    const initWebSocket = async () => {      
      ws.onOpen = (_e) => {
        console.log('WebSocket connection established');
      };
  
      ws.onMessage = (_e) => {
        console.log('Message from server~');
      };
      
      ws.onClose = (_e) => {
          console.log('WebSocket connection closed');
      };
  
      ws.onError = (_e) => {
          console.error('WebSocket error');
      };

      try {
        await ws.Open();
      } catch(e) {
        console.error('Error occured while closing web socket');
      }
    };
    initWebSocket();

    return () => {
      const destoryWebSocket = async () => {
        try{
          await ws.Close(); 
        }catch(e){
          console.error('Error occured while closing web socket');
        }        
      }
      destoryWebSocket();

      refWS.current = null;      
    }
  }, []);

  const opneConnection = useCallback(async () => {
    await refWS.current?.Open();
  }, [refWS.current]);

  const joinRoom = useCallback(async () => {
    if(refWS.current){
      const joinRoomMsg = {
        Type: 'joinRoom',
        UserId: 'hello',
        RoomId: 'room1'
      };
      const result = await refWS.current.Send<ResponseMessage>(joinRoomMsg);
      console.log(result);
    }
  }, [refWS.current]);

  const sendMessage = useCallback(async () => {
    if(refWS.current){
      const sendMessageMsg = {
        Type: 'sendMessage',              
        RoomId: 'room1',
        Sender: 'hello',
        Content: 'Hello World'
      };
      const result = await refWS.current.Send<ResponseMessage>(sendMessageMsg);
      console.log(result);
    }
  }, [refWS.current]);

  const updateStatus = useCallback(async () => {
    if(refWS.current){
      const updateStatusMsg = {
        Type: 'updateStatus',
        UserId: 'hello',
        Status: 'online'
      };
      const result = await refWS.current.Send<ResponseMessage>(updateStatusMsg);
      console.log(result);
    }
  }, [refWS.current]);

  const closeConnection = useCallback(async () => {
    await refWS.current?.Close();
  }, [refWS.current]);

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
        <button onClick={joinRoom} >
          Join Room
        </button>
        <button onClick={sendMessage}>
          Send Message
        </button>
        <button onClick={updateStatus} >
          Update Status
        </button>
        <button onClick={closeConnection} >
          Close Connection
        </button>
        <button onClick={opneConnection}>
          Open Connection
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

export default MyApp