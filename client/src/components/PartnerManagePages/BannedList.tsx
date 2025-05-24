import { useNavigate } from 'react-router';
import dayJs from 'dayjs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import { SearchInputAutoComplete } from '@components/Customization/SearchInputAutoComplete.js';
import 
{ 
  useSecondaryAppBar, 
  SecAppBarMiddleBlock, SecAppBarRightBlock
} from '@components/Customization/SecondaryAppBar.js';
import { IconProxy } from '@components/Customization/IconProxy.js';
import { CustomizedTooltip } from '@components/Customization/CustomizedTooltip.js';

interface BannedPersonInfo {
    name: string;
    introduction: string;
    iconPath: string;
    bannedTime: string
}

const bannedPersonInfoExamples: readonly BannedPersonInfo[] = [
    {
        name: "Alice Johnson",
        introduction: "Software engineer with a passion for AI and web development.",
        iconPath: "/icons/alice.png",
        bannedTime: "2025-03-15T10:30:00Z"
    },
    {
        name: "Bob Smith",
        introduction: "Cybersecurity expert and open-source enthusiast.",
        iconPath: "/icons/bob.png",
        bannedTime: "2025-02-28T14:45:00Z"
    },
    {
        name: "Charlie Davis",
        introduction: "Full-stack developer focusing on scalable applications.",
        iconPath: "/icons/charlie.png",
        bannedTime: "2025-01-20T08:00:00Z"
    },
    {
        name: "Diana Lopez",
        introduction: "UI/UX designer crafting intuitive and beautiful user experiences.",
        iconPath: "/icons/diana.png",
        bannedTime: "2025-03-05T16:20:00Z"
    },
    {
        name: "Ethan Brown",
        introduction: "Data scientist uncovering insights through machine learning.",
        iconPath: "/icons/ethan.png",
        bannedTime: "2025-02-10T12:10:00Z"
    }
];

export const BannedList = () => {
    const navigate = useNavigate();
    const { SecondaryAppBar } = useSecondaryAppBar();

    return (
        <>
            <SecondaryAppBar title="Banned People">
                {(_ctxt) => (
                    <>
                        <SecAppBarMiddleBlock>
                            <SearchInputAutoComplete
                                    open = {false}
                                    options={[]}
                                    placeholder="Name or Keywords"
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
            <List sx={{ pt: '3em' }} dense={true}>
                {bannedPersonInfoExamples.map((person, index) => (
                    <ListItem
                    key={index + person.iconPath}
                    sx={{ padding: '1ch', minHeight: '4em' }}
                    >
                        <ListItemAvatar>
                        <Avatar alt="Profile Picture" src={person.iconPath} />
                        </ListItemAvatar>
                        <ListItemText primary={person.name} secondary={person.introduction} />
                        <ListItemAvatar>
                            <Grid>
                                <Typography variant="body2" color="text.secondary" >
                                    {`at ${dayJs(person.bannedTime).format("YYYY/MM/DD HH:mm")}`}
                                </Typography>
                            </Grid>
                            <Grid sx={{                                        
                                        display: 'flex',
                                        justifyContent: 'end'                                        
                                   }}>
                                <IconButton>
                                    <IconProxy iconName="Recover" />
                                </IconButton>
                                <IconButton>
                                    <IconProxy iconName="Delete" />
                                </IconButton>
                            </Grid>
                        </ListItemAvatar>
                    </ListItem>
                ))}
            </List>
        </>
    );
}

export default BannedList;