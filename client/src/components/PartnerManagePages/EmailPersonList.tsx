import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid2 from "@mui/material/Grid2";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import FormLabel from '@mui/material/FormLabel';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { useSecondaryAppBar, SecAppBarMiddleBlock, SecAppBarRightBlock } from '@components/Customization/SecondaryAppBar.js';
import { SearchInputAutoComplete } from '@components/Customization/SearchInputAutoComplete.js';
import { CustomizedTooltip } from '@components/Customization/CustomizedTooltip.js';
import { IconProxy } from '@components/Customization/IconProxy.js';
import { CollapsableHandler } from '@components/Customization/CollapsableHandler.js';

const emails = [
    {
      groupKey: "March 27, 2025",
      messages: [
        { id: 1, sender: "Alice", subject: "Project Update", summary: "Here is the latest update...", time: "10:30 AM" },
        { id: 2, sender: "Bob", subject: "Meeting Notes", summary: "Key takeaways from the meeting...", time: "2:00 PM" }
      ]
    },
    {
      groupKey: "March 26, 2025",
      messages: [
        { id: 3, sender: "Charlie", subject: "Invoice Attached", summary: "Please find the invoice attached...", time: "5:45 PM" }
      ]
    }
  ];

const EmailPersonList = () => {
    const navigate = useNavigate();
    const { SecondaryAppBar } = useSecondaryAppBar();
    const [ searchCategory, setSearchCategory ] = useState("Date");
    const [ openGroups, setOpenGroups ] = useState<{ [key: string]: boolean }>({});

    const toggleGroup = (date: string) => {
        setOpenGroups((prev) => ({ ...prev, [date]: !prev[date] }));
    };

    useEffect(() => {
        if(emails.length > 0){
            setOpenGroups({
                [`${emails[0].groupKey}`]: true
            });
        }
    },[emails]);

    return (
        <>
            <SecondaryAppBar title="Emails">
                {(_ctxt) => (
                    <>
                        <SecAppBarMiddleBlock>
                            <SearchInputAutoComplete
                                open = {false}
                                options={[]}
                                placeholder="Date, Partner Name or Keywords"
                             />
                        </SecAppBarMiddleBlock>
                        <SecAppBarRightBlock>
                            <CustomizedTooltip arrow title="Go back">
                                <IconButton onClick={() => {
                                    navigate('/partner/list', { replace: true });
                                }} >
                                    <IconProxy iconName="Back" />
                                </IconButton>
                            </CustomizedTooltip>  
                        </SecAppBarRightBlock>
                    </>
                )}
            </SecondaryAppBar>
            <Box sx={{ pt: '3.5em' }}>
                <Box sx={{ 
                    padding: '1ch'
                }}>
                    <Stack direction="row" sx={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <FormLabel sx={{
                            pr: '1ch'
                        }} component="legend">Groping:</FormLabel>
                        <ToggleButtonGroup value={searchCategory} exclusive size="small"
                            onChange={(_e, val) => {
                                if(val !== null){
                                    setSearchCategory(val);
                                }
                            }}
                        >
                            <ToggleButton LinkComponent={Chip} value="Date">
                                Date
                            </ToggleButton>
                            <ToggleButton LinkComponent={Chip} value="Partner">
                                Partner
                            </ToggleButton>
                            <ToggleButton LinkComponent={Chip} value="Context">
                                Context
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                    <List sx={{
                        '&>div': {
                            mb: '1ch'
                        }
                    }}>
                        {emails.map((group) => (
                            <CollapsableHandler key={group.groupKey}
                                                title={group.groupKey}
                                                expaned={openGroups[group.groupKey]}
                                                toggle={() => toggleGroup(group.groupKey)} >
                                <List component="div" disablePadding>
                                    {group.messages.map((msg) => (
                                        <ListItem key={msg.id} sx={{ pl: 2 }}>
                                            <ListItemAvatar>
                                                <Avatar alt="Profile Picture" src={msg.sender} />
                                            </ListItemAvatar>
                                            <ListItemText 
                                                primary={`${msg.sender}: ${msg.subject}`} 
                                                secondary={`${msg.summary}`} 
                                            />
                                            <ListItemAvatar sx={{minWidth: '80px'}}>
                                                <Stack direction={{
                                                    xs: 'column',
                                                    sm: 'row'
                                                }}>
                                                    <Grid2
                                                        sx={{
                                                            padding: '5px',
                                                            alignContent: 'center'
                                                        }}
                                                    >
                                                        <Typography color="text.secondary" >
                                                            {`${msg.time}`}
                                                        </Typography>
                                                    </Grid2>
                                                    <Grid2
                                                        sx={{
                                                            padding: '5px',
                                                            alignContent: 'center'
                                                        }}
                                                    >
                                                        <IconButton sx={{
                                                            padding: '2px'
                                                        }}>
                                                            <IconProxy iconName="Attachment" />
                                                        </IconButton>
                                                        <IconButton sx={{
                                                            padding: '2px'
                                                        }}>
                                                            <IconProxy iconName="Delete" />
                                                        </IconButton>
                                                    </Grid2>                                                    
                                                </Stack>
                                            </ListItemAvatar>
                                        </ListItem>
                                    ))}
                                </List>
                            </CollapsableHandler>
                        ))}
                    </List>
                </Box>
            </Box>
        </>
    );
}

export default EmailPersonList;