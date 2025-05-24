import { useState } from 'react';
import { Outlet } from 'react-router';
import Box from '@mui/material/Box';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { IconProxy } from '@components/Customization/IconProxy.js';
import ReplaceLink from '@components/Customization/ReplaceLink.js';
import { 
  InnerFixedBottomNavigation, 
  InnerFixedBottomNavContext 
} from '@components/Customization/InnerFixedBottomNavigation.js';

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
          <BottomNavigationAction component={ReplaceLink} to="/partner/list" replace label="List" icon={<IconProxy iconName="PartnerList"/>} />
          <BottomNavigationAction component={ReplaceLink} to="/partner/email" replace label="Mail Box" icon={<IconProxy iconName="EmailUnread" />} />
          <BottomNavigationAction component={ReplaceLink} to="/partner/banned" replace label="Banned" icon={<IconProxy iconName="BanndedList" />} />
        </InnerFixedBottomNavigation>
      </InnerFixedBottomNavContext>      
    </Box>
  );
}

export default PartnerManage;