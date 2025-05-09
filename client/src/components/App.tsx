import { useNavigate, Outlet } from 'react-router';
import { createTheme, ThemeProvider } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import FriendsIcon from '@mui/icons-material/Diversity3';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LogoutIcon from '@mui/icons-material/Logout';

import PageLayout, 
{ 
    SidebarTop, SidebarBottom, Content, 
    ListItemButton, ListItemText, ListItemIcon,
    PageLayoutContext
} from '@components/Customization/PageLayout';

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides:{
                root: {
                    textTransform: "none"  // Prevents uppercase transformation
                }
            }
        }
    }
});

const App = () => {
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <title>Chat with AI</title>
            <PageLayout>
                <SidebarTop>
                    <PageLayoutContext.Consumer>
                        {
                            context => (
                                <ListItem disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton 
                                        open={context?.open}
                                        onClick={() => {
                                            navigate('/partner/list', { replace: true });
                                        }}>
                                        <ListItemIcon open={context?.open} >
                                        <FriendsIcon />
                                        </ListItemIcon>
                                        <ListItemText open={context?.open}  primary="Partners" />
                                    </ListItemButton>

                                    <ListItemButton 
                                        open={context?.open}
                                        onClick={() => {
                                            navigate('/chatroom', { replace: true });
                                        }} >
                                        <ListItemIcon open={context?.open} >
                                        <MeetingRoomIcon />
                                        </ListItemIcon>
                                        <ListItemText open={context?.open} primary="Meeting Rooms" />
                                    </ListItemButton>
                                </ListItem>
                            )
                        }
                    </PageLayoutContext.Consumer>
                </SidebarTop>
                <SidebarBottom>
                    <PageLayoutContext.Consumer>
                        {
                            context => (
                                <ListItem>
                                    <ListItemButton open={context?.open}>
                                        <ListItemIcon open={context?.open}>
                                            <LogoutIcon />
                                        </ListItemIcon>
                                        <ListItemText open={context?.open} primary="Log out" />
                                    </ListItemButton>
                                </ListItem>
                            )
                        }                        
                    </PageLayoutContext.Consumer>
                </SidebarBottom>
                <Content>
                    <Outlet />
                </Content>
            </PageLayout>
        </ThemeProvider>      
    );
}

export default App;