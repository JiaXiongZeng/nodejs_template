import { useContext, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { createTheme, ThemeProvider } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { IconProxy } from '@components/Customization/IconProxy.js';
import { UserContext, UserReducerContext, UserContextActionType } from '@components/Contexts/UserContext.js';
import { ConditionalOutlet } from '@components/Customization/ConditionalOutLet.js';
import { useGetLoginInfo, useLogout } from '@components/Queries/Authentication.js';
import { useQueuedAlert } from '@components/Contexts/QueuedAlertContext.js';

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
    const userContext = useContext(UserContext);
    const disptachUserContext = useContext(UserReducerContext);
    const alertMgr = useQueuedAlert();
    const { data: loginInfo, isSuccess, isError, error } = useGetLoginInfo();
    const doLogout = useRef(false);
    const { mutateAsync: logout } = useLogout({
        onSuccess: async (respData) => {
            if(respData?.success){
                disptachUserContext!({
                    type: UserContextActionType.CLEAR,
                    onChanged: () => {
                        alertMgr.pushAlert("info", respData.data);
                    }
                });
                doLogout.current = true;
            }else{
                alertMgr.pushAlert("error", respData.data);
            }
        },
        onError: (err) => {
            alertMgr.pushAlert("error", err.message);
        }
    });
    const { pathname } = useLocation();
    const noLoginErrorHintPaths = ['/', '/login'];

    useEffect(() => {
        let error_code: Nullable<string> | undefined;
        let error_message: Nullable<string> | undefined;
        if(!doLogout.current && !noLoginErrorHintPaths.includes(pathname)){
            error_code = loginInfo?.error?.code;
            error_message = loginInfo?.error?.message;
        }

        //Logout manually
        if(doLogout.current && userContext === null){
            navigate("/login", { replace: true });
            return;
        }

        if(userContext === null){
            //Refresh with F5
            if(isSuccess && loginInfo){
                if(loginInfo.success){
                    disptachUserContext!({
                        type: UserContextActionType.SET,
                        data: loginInfo.data
                    });
                } else {
                    navigate("/login", { 
                        replace: true,
                        state: {
                            error_code: error_code,
                            error_message: error_message
                        }
                    });
                }
                return;
            }

            if(isError){
                navigate("/login", { 
                    replace: true,
                    state: {
                        error_code: "",
                        error_message: error?.message
                    }
                });
            }
        }
    }, [userContext, disptachUserContext, loginInfo, isSuccess, isError, doLogout.current]);

    return (
        <ThemeProvider theme={theme}>
            {
                userContext === null ? 
                    <ConditionalOutlet show={["/login"]} /> :
                    <>
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
                                                        <IconProxy iconName="Friends" />
                                                    </ListItemIcon>
                                                    <ListItemText open={context?.open}  primary="Partners" />
                                                </ListItemButton>

                                                <ListItemButton 
                                                    open={context?.open}
                                                    onClick={() => {
                                                        navigate('/chatroom', { replace: true });
                                                    }} >
                                                    <ListItemIcon open={context?.open} >
                                                        <IconProxy iconName="MeetingRoom" />
                                                    </ListItemIcon>
                                                    <ListItemText open={context?.open} primary="Meeting Rooms" />
                                                </ListItemButton>

                                                <ListItemButton
                                                    open={context?.open}
                                                    onClick={() => {
                                                        navigate('/settings', { replace: true });
                                                    }} >
                                                    <ListItemIcon open={context?.open}>
                                                        <IconProxy iconName="Settings" />
                                                    </ListItemIcon>
                                                    <ListItemText open={context?.open} primary="Settings" />
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
                                                <ListItemButton open={context?.open} onClick={async () => {
                                                    await logout();
                                                }}>
                                                    <ListItemIcon open={context?.open}>
                                                        <IconProxy iconName="Logout" />
                                                    </ListItemIcon>
                                                    <ListItemText open={context?.open} primary="Log out" />
                                                </ListItemButton>
                                            </ListItem>
                                        )
                                    }                        
                                </PageLayoutContext.Consumer>
                            </SidebarBottom>
                            <Content>
                                <ConditionalOutlet dontShow={["/login"]} />
                            </Content>
                        </PageLayout>
                    </>
            }            
        </ThemeProvider>      
    );
}

export default App;