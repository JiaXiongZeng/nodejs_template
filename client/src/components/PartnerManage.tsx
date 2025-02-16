import { useState } from 'react';
import { Routes, Route } from 'react-router';
import Box from '@mui/material/Box';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import PeopleIcon from '@mui/icons-material/People';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

import ListPartner from '@components/PartnerManagePages/ListPartner';
import ReplaceLink from '@components/Customization/ReplaceLink';

import { 
  InnerFixedBottomNavigation, 
  InnerFixedBottomNavContext 
} from '@components/Customization/InnerFixedBottomNavigation';

export const PartnerManage = () => {
  const [val, setVal] = useState(0);

  return (
    <Box sx={{ mt: -3, pb: 7 }}>
      <InnerFixedBottomNavContext value={{
        value: val,
        setValue: setVal
      }}>
        <Routes>
          <Route index element={<ListPartner/>}/>
          <Route path="list" element={<ListPartner/>} />
        </Routes>
        <InnerFixedBottomNavigation>
          <BottomNavigationAction component={ReplaceLink} to="/partner/list" replace label="List" icon={<PeopleIcon />} />
          <BottomNavigationAction label="Mail Box" icon={<MarkAsUnreadIcon />} />
          <BottomNavigationAction label="Banned" icon={<NotInterestedIcon />} />
        </InnerFixedBottomNavigation>
      </InnerFixedBottomNavContext>      
    </Box>
  );
}

export default PartnerManage;