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

export const ChatRoomManage = () => {
  const [val, setVal] = useState(0);

  return (
    <Box sx={{ mt: -3, pb: 7 }}>
      <InnerFixedBottomNavContext value={{
        value: val,
        setValue: setVal
      }}>
        <Outlet/>
        <InnerFixedBottomNavigation>
          <BottomNavigationAction component={ReplaceLink} to="/chatroom/list" replace label="Explore" icon={<IconProxy iconName="Explore"/>} />
          <BottomNavigationAction component={ReplaceLink} to="/chatroom/mine" replace label="My Room" icon={<IconProxy iconName="MyFavorite" />} />
        </InnerFixedBottomNavigation>
      </InnerFixedBottomNavContext>      
    </Box>
  );
}

export default ChatRoomManage;