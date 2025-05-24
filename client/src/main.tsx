import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

import CssBaseline from '@mui/material/CssBaseline';
import App from '@components/App.js';
import PartnerManage from '@components/PartnerManage.js';
import AddPartner from '@components/PartnerManagePages/AddPartner.js';
import ListPartner from '@components/PartnerManagePages/ListPartner.js';
import EmailPersonList from '@components/PartnerManagePages/EmailPersonList.js';
import { BannedList } from '@components/PartnerManagePages/BannedList.js';
import { ChatRoomManage } from '@components/ChatRoomManage.js';
import { AddRoom } from '@components/ChatRoomPages/AddRoom.js';
import { MyRoom } from '@components/ChatRoomPages/MyRoom.js';
import { ExploreRooms } from '@components/ChatRoomPages/ExploreRooms.js';
import { SettingsManage } from '@components/SettingsManage.js';
import { Login } from '@components/Login.js';
import { UserContextProvider } from '@components/Contexts/UserContextProvider.js';
import { QueuedAlertProvider } from '@components/Contexts/QueuedAlertProvider.js';

import "@styles/main.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //staleTime: 0,
      //refetchOnMount: 'always',
      gcTime: 1000 * 60 * 60 * 24 // 1 day
    }
  }
});

const asyncLocalStorage = {
  getItem: async (key: string) => window.localStorage.getItem(key),
  setItem: async (key: string, value: string) => window.localStorage.setItem(key, value),
  removeItem: async (key: string) => window.localStorage.removeItem(key),
};

const asyncStoragePersister = createAsyncStoragePersister({
  storage: asyncLocalStorage
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister
      }}>
        <QueuedAlertProvider>
          <UserContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} >
                  {/* Default route */}
                  <Route index element={<Navigate to="/partner/list" replace />} />

                  {/* Various feature routes */}
                  <Route path="partner" element={<PartnerManage />} >
                    <Route path="list" index element={<ListPartner />} />
                    <Route path="add" element={<AddPartner />} />
                    <Route path="email" element={<EmailPersonList />} />
                    <Route path="banned" element={<BannedList />} />
                  </Route>

                  <Route path="chatroom" element={<ChatRoomManage />} >
                    <Route index element={<Navigate to="/chatroom/list" replace />} />
                    <Route path="mine" element={<MyRoom />} >
                      <Route path="add" element={<AddRoom />} />
                    </Route>
                    <Route path="list" element={<ExploreRooms />} />
                  </Route>

                  <Route path="settings" element={<SettingsManage />} />

                  {/* Login route */}
                  <Route path="login" element={<Login />} />

                  {/* Unmatched routes */}
                  <Route path="*" element={<>404 Not Found</>} />
                </Route>
              </Routes>
            </BrowserRouter>
          </UserContextProvider>
        </QueuedAlertProvider>
    </PersistQueryClientProvider>
  </StrictMode>
)
