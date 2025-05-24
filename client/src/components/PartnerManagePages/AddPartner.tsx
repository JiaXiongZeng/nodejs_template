import { useNavigate } from 'react-router';
import { styled } from '@mui/material';
import Grid, { GridProps } from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import { useSecondaryAppBar, SecAppBarMiddleBlock, SecAppBarRightBlock } from '@components/Customization/SecondaryAppBar.js';
import { SearchInputAutoComplete } from '@components/Customization/SearchInputAutoComplete.js';
import { CustomizedTooltip } from '@components/Customization/CustomizedTooltip.js';
import { IconProxy, type IconType } from '@components/Customization/IconProxy.js';

import reactSVG from '@assets/react.svg';

const Item = styled(({children, ...props }: GridProps) => 
    <Grid {...props} size={{xs: 6, sm: 6, md: 2, lg: 2}} >
        {children}
    </Grid>
)(({theme}) => ({    
    padding: theme.spacing(1),
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    display: 'inline-flex',
    textIndent: theme.spacing(2),
    minWidth: 'fit-content',
    justifyContent: 'flext-start', //default
    [theme.breakpoints.up("sm")]: {
        justifyContent: 'flex-start'
    }
}));

// Define interesting item type
interface InterestingItem {
    muiIcon: IconType;
    title: string; // Use MUI icon component names as strings
}
  
// Define some interesting examples
const InterestingItems: InterestingItem[] = [
    { muiIcon: "Photography", title: "Photography" },
    { muiIcon: "Travel", title: "Travel" },
    { muiIcon: "Coding", title: "Coding" },
];

export const AddPartner = () => {
    const navigate = useNavigate();
    const { SecondaryAppBar } = useSecondaryAppBar();
    return (
        <>
            <SecondaryAppBar title="Add partner">
                {(_ctxt) => (
                    <>
                        <SecAppBarMiddleBlock>
                            <SearchInputAutoComplete
                                open = {false}
                                options={[]}
                                placeholder="Phone/Id/Email"
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
            <Box sx={{ pt: '3em' }}>
                <Box sx={{ 
                    padding: '1ch',
                    '&>div': {
                        mb: '2ch'
                    }
                }}>
                    <Typography component="div" variant="h6" sx={{fontWeight: 'bold'}} >
                        Search Results
                    </Typography>
                    <Grid container size={12} >
                            <Grid size={{ xs: 2 }} 
                                   sx={(theme) => ({ 
                                        justifyItems: 'center', 
                                        alignContent: 'center',
                                        [`${theme.breakpoints.up('sm')}`]: {
                                            width: '10em'
                                        }
                                    })} 
                            >
                                <Avatar alt="User Profile" src={reactSVG} sx={(theme) => ({
                                    width: '2.5em',
                                    height: '2.5em',
                                    [`${theme.breakpoints.up('sm')}`]: {
                                        width: '4em',
                                        height: '4em'
                                    }
                                })} />
                            </Grid>
                            <Grid size={{ xs: 10, sm: 'grow'}}>
                                <Stack>
                                    <Grid sx={{ mb: 0.5 }}>
                                        <Typography variant="h6">Willy Zeng</Typography>
                                    </Grid>
                                    <Grid sx={{ mb: 1 }}>
                                        <Typography variant="body2" sx={{
                                            color: 'text.secondary'
                                        }}>@A0001</Typography>                                        
                                    </Grid>
                                    <Grid container 
                                           spacing={1} 
                                           sx={{pl: '0px'}} 
                                           direction="row"
                                    >
                                        <Grid>
                                            <Button variant="contained" size="small" >
                                                <IconProxy iconName="PersonAdd" />
                                                <Typography sx={{ml: '1ch'}}>Add as partner</Typography>
                                            </Button>
                                        </Grid>
                                        <Grid>
                                            <Button variant="contained" size="small" color="error" >
                                                <IconProxy iconName="Block" />
                                                <Typography sx={{ml: '1ch'}}>Block</Typography>
                                            </Button>
                                        </Grid>                                        
                                    </Grid>
                                </Stack>
                            </Grid>          
                        </Grid>
                    <Grid container direction="row" spacing={1} >                        
                        {InterestingItems.map((item, index) => (
                            <Item key={index}>
                                <IconProxy iconName={item.muiIcon} color="primary" fontSize="medium" />
                                <Typography variant="subtitle1" >
                                    {item.title}
                                </Typography>
                            </Item>
                        ))}
                    </Grid>
                    <Typography component="div" variant="h6" sx={{fontWeight: 'bold'}} >
                        About
                    </Typography>
                    <Grid container 
                           sx={(theme) => ({
                              [`${theme.breakpoints.down('sm')}`]: {
                                  maxHeight: '20ch',
                                  overflow: 'auto'
                              }
                           })}
                    >
                        <Grid 
                           size={{
                              sm: 11,
                              md: 10,
                              lg: 7
                           }} 
                        >
                            <Typography sx={{
                                textAlign: 'justify',
                                whiteSpace: 'pre-line',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word'
                            }}>
                                I'm Willy a dynamic individual known for his adaptability and problem-solving skills. 
                                With a strong background in technology and a passion for innovation, 
                                I consistently approaches challenges with creativity and a positive attitude. 
                                Outside of work, I enjoys exploring new hobbies and connecting with others. 
                                My curiosity drives me to continuously learn and grow in both personal and professional spheres. 
                                Whether collaborating with teammates or working independently, 
                                My dedication and enthusiasm make me a valuable asset in any endeavor.
                            </Typography>
                        </Grid>                        
                    </Grid>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}} >
                        Contact
                    </Typography>
                    <Grid container>                        
                        <Stack>
                            <Grid container>
                                <Grid sx={{width: '2em'}}>
                                    <IconProxy iconName="Phone" color="primary" fontSize="medium" />
                                </Grid>
                                <Grid>
                                    +1 123 456 7890
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid sx={{width: '2em'}}>
                                    <IconProxy iconName="Email" color="primary" fontSize="medium" />
                                </Grid>
                                <Grid>
                                    willy.tseng@evertrust.com.tw
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid sx={{width: '2em'}}>
                                    <IconProxy iconName="WWW" color="primary" fontSize="medium" />
                                </Grid>
                                <Grid>
                                    https://www.google.com
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                </Box>                
            </Box>
        </>        
    );
}

export default AddPartner;