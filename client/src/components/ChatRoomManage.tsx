import { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Statck from '@mui/material/Stack';
import Grid2 from "@mui/material/Grid2";
import List from '@mui/material/List';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import dayJs from 'dayjs';

import { useSecondaryAppBar, SecAppBarMiddleBlock, SecAppBarRightBlock } from '@components/Customization/SecondaryAppBar.js';
import { SearchInputAutoComplete } from '@components/Customization/SearchInputAutoComplete.js';
import { CustomizedTooltip } from '@components/Customization/CustomizedTooltip.js';
import { IconProxy } from '@components/Customization/IconProxy.js';
import { CollapsableHandler } from '@components/Customization/CollapsableHandler.js';
import { CustomizedDialog, CustomizedDialogHandler } from '@components/Customization/CustomizedDialog.js';
import { useDraggablePaper } from '@components/Customization/DraggablePaper.js';


const ListItemWithDisabled = styled(ListItem, {
    shouldForwardProp: (prop) => prop !== "disabled"
})<ListItemProps & {disabled?: boolean}>(({ disabled }) => ({
    "& .may-disabled-subItem": {
        opacity: disabled ? 0.5 : 1,                 // Make it look disabled 
        pointerEvents: disabled ? "none" : "auto",   // Prevent clicks
        userSelect: disabled ? "none" : "auto",      // Prevent text selection
        cursor: disabled ? "default" : "pointer",    // Change cursor appearance
    },    
    "& .always-enabled-subItem": {
        pointerEvents: "auto",                       // Re-enable click events for specific icons
        opacity: 1,                                  // Keep icons fully visible
    }
}));

export const ChatRoomManage = () => {
    const { SecondaryAppBar } = useSecondaryAppBar();
    const [ openGroups, setOpenGroups ] = useState<{ [key: string]: boolean }>({});    
    const toggleGroup = (date: string) => {
        setOpenGroups((prev) => ({ ...prev, [date]: !prev[date] }));
    };

    const navigate = useNavigate();
    const refModal = useRef<CustomizedDialogHandler>(null);

    const dragHandlerId = "draggable-dialog-title";
    const draggablePaper = useDraggablePaper(`#${dragHandlerId}`, '[class*="MuiDialogContent-root"]');

    useEffect(() => {
        setOpenGroups({
            "Self Created": true,
            "Joined": true
        });
    }, []);

    return (
        <Box sx={{ mt: -3 }}>
            <SecondaryAppBar title="Chat Rooms">
                {(_ctxt) => (
                    <>
                        <SecAppBarMiddleBlock>
                            <SearchInputAutoComplete
                                open = {false}
                                options={[]}
                                placeholder="Chat Room Name"
                             />
                        </SecAppBarMiddleBlock>
                        <SecAppBarRightBlock>
                            <CustomizedTooltip arrow title="Add Chat Room">
                                <IconButton>
                                    <IconProxy iconName="AddBox" onClick={() => {
                                        refModal.current?.toggleOpen(true);
                                        refModal.current?.setTitle("Add Chat Room");
                                        navigate('/chatroom/add', { replace: true });
                                    }} />
                                </IconButton>
                            </CustomizedTooltip>                            
                        </SecAppBarRightBlock>
                    </>
                )}
            </SecondaryAppBar>
            <Box sx={{ pt: '3.5em' }}>
                <Box sx={{
                    padding: '1ch'
                }} >
                    <List sx={{
                        '&>div': {
                            mb: '1ch'
                        }
                    }}>
                        {chatGroups.map(group => (
                            <CollapsableHandler key={group.groupKey}
                                                title={group.groupKey}
                                                expaned={openGroups[group.groupKey]}
                                                toggle={() => toggleGroup(group.groupKey)} >
                                <List component="div" disablePadding>
                                    {group.rooms.map(room => (
                                        <ListItemWithDisabled key={room.name} disabled={room.isAbandoned} >
                                            <ListItemAvatar className="may-disabled-subItem">
                                                <Avatar>
                                                    <IconProxy iconName="Communication" />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={room.name}
                                                secondary={`Last active one: ${room.lastSpokenBy}`}
                                                className="may-disabled-subItem"
                                            />
                                            <Statck>
                                                <Grid2 sx={{
                                                    padding: '0',
                                                    margin: '0',
                                                    alignContent: 'center'
                                                }} size={{
                                                    xs: 12,
                                                    sm: 6
                                                }} className="may-disabled-subItem" >
                                                    <Typography variant="body2" color='text.secondary'>
                                                        {`Created by ${room.createdBy}`}
                                                    </Typography>
                                                </Grid2>
                                                <Grid2 sx={{
                                                    padding: '0',
                                                    margin: '0',
                                                    alignContent: 'center'
                                                }} size={{
                                                    xs: 12,
                                                    sm: 6
                                                }} className="may-disabled-subItem" >
                                                    <Typography variant="body2" color='text.secondary'>
                                                        {`at ${dayJs(room.createdAt).format("YYYY/MM/DD HH:mm")  }`}
                                                    </Typography>
                                                </Grid2>
                                                <Grid2 sx={{
                                                    padding: '5px',
                                                    display: 'flex',
                                                    justifyContent: 'end',
                                                    '& .MuiIconButton-root': {
                                                        ml: '10px'
                                                    }
                                                }} >
                                                    {
                                                        group.groupKey == "Self Created"
                                                        ?
                                                            <>
                                                                <CustomizedTooltip arrow title="Edit" >
                                                                    <IconButton sx={{
                                                                        padding: '2px'
                                                                    }} className="may-disabled-subItem" >
                                                                        <IconProxy iconName="Edit" />
                                                                    </IconButton>
                                                                </CustomizedTooltip>                                                                
                                                                <CustomizedTooltip arrow title="Abandon Room" >
                                                                    <IconButton sx={{
                                                                        padding: '2px'
                                                                    }} className="always-enabled-subItem">
                                                                        <IconProxy iconName="Delete" />
                                                                    </IconButton>
                                                                </CustomizedTooltip>
                                                            </>
                                                        :
                                                        null
                                                    }
                                                    <CustomizedTooltip arrow title="Leave Room">
                                                        <IconButton sx={{
                                                            padding: '2px'
                                                        }} className="always-enabled-subItem" >
                                                            <IconProxy iconName="Leave" />
                                                        </IconButton>
                                                    </CustomizedTooltip>
                                                </Grid2>
                                            </Statck>                                            
                                        </ListItemWithDisabled>
                                    ))}                                    
                                </List>
                            </CollapsableHandler>
                        ))}
                    </List>
                </Box>
                <CustomizedDialog 
                    open={false} 
                    fullWidth={false} 
                    fullHeight={false}
                    titleId={dragHandlerId}
                    PaperComponent={draggablePaper}
                    closeButton={false}
                    ref={refModal} >
                    <Outlet context={refModal.current} />
                </CustomizedDialog>
            </Box>
        </Box>
    );
};

type ChatRoom = {
    name: string;
    createdAt: string;
    createdBy: string;
    lastSpokenBy: string;
    isAbandoned: boolean;
};
  
type ChatGroup = {
    groupKey: "Self Created" | "Joined";
    rooms: ChatRoom[];
};
  
const chatGroups: ChatGroup[] = [
    {
      groupKey: "Self Created",
      rooms: [
        {
          name: "General Chat",
          createdAt: "2025-03-28T08:30:00Z",
          createdBy: "Alice",
          lastSpokenBy: "Bob",
          isAbandoned: false
        },
        {
          name: "Gaming Room",
          createdAt: "2025-03-26T20:45:00Z",
          createdBy: "Eve",
          lastSpokenBy: "Frank",
          isAbandoned: true
        },
        {
          name: "Movie Fans",
          createdAt: "2025-03-24T18:20:00Z",
          createdBy: "Ivy",
          lastSpokenBy: "Jack",
          isAbandoned: false
        }
      ]
    },
    {
      groupKey: "Joined",
      rooms: [
        {
          name: "Tech Discussions",
          createdAt: "2025-03-27T14:15:00Z",
          createdBy: "Charlie",
          lastSpokenBy: "Dave",
          isAbandoned: false
        },
        {
          name: "Music Lovers",
          createdAt: "2025-03-25T10:05:00Z",
          createdBy: "Grace",
          lastSpokenBy: "Hank",
          isAbandoned: true
        },
        {
          name: "Photography Lounge",
          createdAt: "2025-03-21T15:40:00Z",
          createdBy: "Oscar",
          lastSpokenBy: "Paul",
          isAbandoned: false
        }
      ]
    }
];  