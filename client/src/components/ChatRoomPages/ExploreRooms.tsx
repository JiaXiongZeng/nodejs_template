import { useState, useEffect, use } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { InnerFixedBottomNavContext } from '@components/Customization/InnerFixedBottomNavigation.js';
import { useSecondaryAppBar, SecAppBarMiddleBlock } from '@components/Customization/SecondaryAppBar.js';
import { SearchInputAutoComplete } from '@components/Customization/SearchInputAutoComplete.js';
import { CollapsableHandler } from '@components/Customization/CollapsableHandler.js';
import { ListItemWithDisabled } from '@components/Customization/ListItemWithDisabled.js';
import { IconProxy } from '@components/Customization/IconProxy.js';
import { IconButton } from '@mui/material';

export const ExploreRooms = () => {
    const { SecondaryAppBar } = useSecondaryAppBar();
    const [ openGroups, setOpenGroups ] = useState<{ [key: string]: boolean }>({});
    const toggleGroup = (key: string) => {
        setOpenGroups((prev) => ({  ...prev, [key]: !prev[key] }));
    };

    //Content Block
    const context = use(InnerFixedBottomNavContext);

    //Avoid the navbar icon focus on wrong one after use route navigate feature
    useEffect(() => {
      context?.setValue(0);
    }, []);

    useEffect(() => {
        let top = 0;
        let openState: { [key: string]: boolean} = {};
        for(const elem of exploreGroups){
            if(top++ < 3){
                openState[elem.Category] = true;
            } else {
                break;
            }
        }
        setOpenGroups(openState);
    }, []);

    return (
        <Box sx={{ mt: -3 }}>
            <SecondaryAppBar title="Explore Rooms">
                {(_ctxt) => (
                    <>
                        <SecAppBarMiddleBlock>
                            <SearchInputAutoComplete 
                                open={false}
                                options={[]}
                                placeholder="Chat Room Name"
                             />
                        </SecAppBarMiddleBlock>
                    </>
                )}
            </SecondaryAppBar>
            <Box sx={{ pt: '3em' }} >
                <Box sx={{
                    padding: '1ch'
                }}>
                    <List sx={{
                        '&>div': {
                            mb: '1ch'
                        }
                    }}>
                        {exploreGroups.map(group => (
                            <CollapsableHandler key={group.Category}
                                                title={group.Category}
                                                expaned={openGroups[group.Category]}
                                                toggle={() => toggleGroup(group.Category)} >
                                <List component="div" disablePadding>
                                    {group.ChatRooms.map((room) => (
                                        <ListItemWithDisabled key={room.Name} disabled={room.IsBanned} >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    { room.IsPrivate? <IconProxy iconName="PrivateCommunication" /> : <IconProxy iconName="Communication" />}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText 
                                                sx={{ flexGrow: 1 }}
                                                primary={room.Name}>
                                            </ListItemText>
                                            <Stack direction="row" spacing={1} 
                                                sx={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    minWidth: '75px' 
                                            }}>
                                                <Grid>
                                                    <IconProxy iconName="Groups" sx={theme => ({
                                                        color: theme.palette.grey[500]
                                                    })} />
                                                </Grid>
                                                <Grid sx={{ display: 'flex', justifyContent: 'center', minWidth: '42px' }} >
                                                    <Typography>{`${room.PeopleCount}/${room.PeopleLimit}`}</Typography>
                                                </Grid>
                                                <Grid>
                                                    <IconButton>
                                                      <IconProxy iconName="AddBox" />
                                                    </IconButton>
                                                </Grid>
                                            </Stack>
                                        </ListItemWithDisabled>
                                    ))}
                                </List>
                            </CollapsableHandler>
                        ))}
                    </List>
                </Box>                
            </Box>
        </Box>
    );
}

export default ExploreRooms;


type ChatRoom = {
   Name: string;
   PeopleLimit: number;
   PeopleCount: number;
   CreateDate: string;
   IsPrivate: boolean;
   IsBanned: boolean;
};
  
type CategoryGroup = {
   Category: string;
   ChatRooms: ChatRoom[];
};
  
const exploreGroups: CategoryGroup[] = [
    {
      Category: "Gaming",
      ChatRooms: [
        {
          Name: "Valorant Squad",
          PeopleLimit: 10,
          PeopleCount: 7,
          CreateDate: "2025-04-01T15:30:00Z",
          IsPrivate: false,
          IsBanned: false,
        },
        {
          Name: "Minecraft Builders",
          PeopleLimit: 15,
          PeopleCount: 12,
          CreateDate: "2025-03-28T12:00:00Z",
          IsPrivate: false,
          IsBanned: false,
        },
      ],
    },
    {
      Category: "Study",
      ChatRooms: [
        {
          Name: "Math Help",
          PeopleLimit: 20,
          PeopleCount: 19,
          CreateDate: "2025-03-15T09:00:00Z",
          IsPrivate: true,
          IsBanned: false,
        },
        {
          Name: "History Buffs",
          PeopleLimit: 10,
          PeopleCount: 10,
          CreateDate: "2025-03-20T18:00:00Z",
          IsPrivate: false,
          IsBanned: true,
        },
      ],
    },
    {
      Category: "Technology",
      ChatRooms: [
        {
          Name: "JavaScript Devs",
          PeopleLimit: 30,
          PeopleCount: 25,
          CreateDate: "2025-04-05T14:00:00Z",
          IsPrivate: true,
          IsBanned: false,
        },
        {
          Name: "AI & ML Talk",
          PeopleLimit: 50,
          PeopleCount: 48,
          CreateDate: "2025-04-03T11:00:00Z",
          IsPrivate: true,
          IsBanned: false,
        },
      ],
    },
    {
      Category: "Music",
      ChatRooms: [
        {
          Name: "K-Pop Fans",
          PeopleLimit: 40,
          PeopleCount: 35,
          CreateDate: "2025-04-02T10:30:00Z",
          IsPrivate: false,
          IsBanned: false,
        },
        {
          Name: "Jazz Lounge",
          PeopleLimit: 20,
          PeopleCount: 17,
          CreateDate: "2025-03-31T20:00:00Z",
          IsPrivate: false,
          IsBanned: false,
        },
      ],
    },
    {
      Category: "Fitness",
      ChatRooms: [
        {
          Name: "Home Workouts",
          PeopleLimit: 25,
          PeopleCount: 23,
          CreateDate: "2025-03-29T08:15:00Z",
          IsPrivate: true,
          IsBanned: false,
        },
        {
          Name: "Running Buddies",
          PeopleLimit: 15,
          PeopleCount: 15,
          CreateDate: "2025-04-01T06:00:00Z",
          IsPrivate: true,
          IsBanned: true,
        },
      ],
    },
  ];  