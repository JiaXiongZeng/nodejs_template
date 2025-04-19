import { useState, useImperativeHandle, createContext, FC, ReactNode, ReactElement } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import MuiListItemButton, { ListItemButtonProps as MuiListItemButtonProps } from '@mui/material/ListItemButton';
import MuiListItemIcon, { ListItemIconProps as MuiListItemIconProps } from '@mui/material/ListItemIcon';
import MuiListItemText, { ListItemTextProps as MuiListItemTextProps } from '@mui/material/ListItemText';

import reactSVG from '@assets/react.svg';
import StyledBadge from '@components/Customization/StyledBadge.js';


export const drawerMaxWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerMaxWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerMaxWidth,
        width: `calc(100% - ${drawerMaxWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }
    }
  ]
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerMaxWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        }
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        }
      }
    ]
  })
);

interface ListItemButtonProps extends MuiListItemButtonProps {
  open?: boolean;
}

export const ListItemButton = styled(MuiListItemButton, { 
  shouldForwardProp: (prop) => prop !== 'open' 
})<ListItemButtonProps>(
  ({open}) => ({
    minHeight: 48,
    px: 2.5,
    justifyContent: open? 'initial': 'center'
  }),
);

interface ListItemIconProps extends MuiListItemIconProps {
  open?: boolean;
}

export const ListItemIcon = styled(MuiListItemIcon, { 
  shouldForwardProp: (prop) => prop !== 'open' 
})<ListItemIconProps>(
  ({theme, open}) => ({
    minWidth: 0,
    justifyContent: 'center',
    marginRight: open? theme.spacing(2): 'auto'
  })
);

interface ListItemTextProps extends MuiListItemTextProps {
  open?: boolean;
}

export const ListItemText = styled(MuiListItemText, { 
  shouldForwardProp: (prop) => prop !== 'open' 
})<ListItemTextProps>(
  ({open}) => ({
    minWidth: 0,
    justifyContent: 'center',
    opacity: open? 1: 0
  })
);

export const SidebarTop = List;
export const SidebarBottom: FC<{ children?: ReactNode }> = ({children}) => <List sx={{
    display: 'flex',
    flexGrow: 1,
    alignItems: 'flex-end'
  }} >
    {children}
  </List>;
export const Content: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>;

interface PageLayoutContextProps {
    open?: boolean
}

export const PageLayoutContext = createContext<Nullable<PageLayoutContextProps>>(null);

interface PageLayoutProps {
    open?: boolean,
    children: [ ReactElement<typeof SidebarTop>, ReactElement<typeof SidebarBottom>, ReactElement<typeof Content> ]
    ref?: React.Ref<PageLayoutHandler>;
}

interface PageLayoutHandler{
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
    toggleDrawer: () => void;
}

const PageLayout = (
    {
      open, 
      children, 
      ref 
    }: PageLayoutProps) => {
    const [ sidebarTop, sidebarBottom, content ] = children;

    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(open);
    
  
    const handleDrawerOpen = () => {
      setDrawerOpen(true);
    };
  
    const handleDrawerClose = () => {
      setDrawerOpen(false);
    };

    useImperativeHandle(ref, () => ({
        handleDrawerOpen: handleDrawerOpen,
        handleDrawerClose: handleDrawerClose,
        toggleDrawer: () => {
            setDrawerOpen(!drawerOpen);
        }
    }), [drawerOpen]);
  
    return (
      <PageLayoutContext value={{ open: drawerOpen }}>
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={drawerOpen}>
              <Toolbar>
                  <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={[
                      {
                      marginRight: 5,
                      },
                      drawerOpen! && { display: 'none' },
                  ]}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} >
                    Chat with AI in meetings
                  </Typography>
                  
                  <StyledBadge 
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    hintColor='green'
                  >
                    <ButtonBase 
                      sx={{
                        borderRadius: '50%', // Ensures the ripple effect stays within the circle
                        overflow: 'hidden', // Ensures ripple doesn't exceed the Avatar bounds
                      }} >
                      <Avatar alt="User Profile" src={reactSVG} />
                    </ButtonBase>
                  </StyledBadge>                                    
              </Toolbar>
            </AppBar>
            <Box sx={
            { 
                display: 'flex', 
                flexGrow: 1,
                //make the height of the following contents below AppBar 100vh
                height: '100vh'
            }
            }>
            <Drawer variant="permanent" open={drawerOpen}>
                <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
                </DrawerHeader>
                <Divider />
                { sidebarTop }
                <Divider />
                { sidebarBottom }
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, pt: 3 }}>
                {/* make a dumy space to occupy the AppBar height */}
                <DrawerHeader />
                { content } 
            </Box>
            </Box>      
        </Box>
      </PageLayoutContext>      
    );
}

export default PageLayout;