import { useState } from 'react';
import { Outlet } from 'react-router';
import Box from '@mui/material/Box';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import PeopleIcon from '@mui/icons-material/People';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

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
        <Outlet/>
        <InnerFixedBottomNavigation>
          <BottomNavigationAction component={ReplaceLink} to="/partner/list" replace label="List" icon={<PeopleIcon />} />
          <BottomNavigationAction component={ReplaceLink} to="/partner/email" replace label="Mail Box" icon={<MarkAsUnreadIcon />} />
          <BottomNavigationAction label="Banned" icon={<NotInterestedIcon />} />
        </InnerFixedBottomNavigation>
      </InnerFixedBottomNavContext>      
    </Box>
  );
}

export default PartnerManage;