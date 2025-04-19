import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import App from '@components/App.js';
import PartnerManage from '@components/PartnerManage.js';
import AddPartner from '@components/PartnerManagePages/AddPartner.js';
import ListPartner from '@components/PartnerManagePages/ListPartner.js';
import EmailPersonList from '@components/PartnerManagePages/EmailPersonList.js';
import { ChatRoomManage } from '@components/ChatRoomManage.js';
import { AddRoom } from '@components/ChatRoomPages/AddRoom.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
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
          </Route>

          <Route path="chatroom" element={<ChatRoomManage />} >
            <Route path="add" element={<AddRoom />} />
          </Route>

          {/* Unmatched routes */}
          <Route path="*" element={<>404 Not Found</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
