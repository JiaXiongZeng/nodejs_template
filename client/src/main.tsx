import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import App from '@components/App';
import PartnerManage from '@components/PartnerManage';
import AddPartner from '@components/PartnerManagePages/AddPartner';
import ListPartner from '@components/PartnerManagePages/ListPartner';

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
          </Route>

          <Route path="test" element={<>Test</>} />

          {/* Unmatched routes */}
          <Route path="*" element={<>404 Not Found</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
