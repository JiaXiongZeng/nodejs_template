import { use, useState, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import { InnerFixedBottomNavContext } from '@components/Customization/InnerFixedBottomNavigation.js';
//import { Search, StyledInputBase, SearchIconWrapper  } from '@components/Customization/SearchInput';
import { SearchInputAutoComplete } from '@components/Customization/SearchInputAutoComplete.js';
import 
{ 
  useSecondaryAppBar, 
  SecAppBarMiddleBlock, SecAppBarRightBlock, SecAppBarMobilePopBlock
} from '@components/Customization/SecondaryAppBar.js';
import { CustomizedTooltip } from '@components/Customization/CustomizedTooltip.js';
import { IconProxy } from '@components/Customization/IconProxy.js';

interface PersonInfo {
    name: string;
    introduction: string;
    iconPath: string;
}
  
const personInfoExamples: readonly PersonInfo[] = [
  {
      name: "Alice Johnson",
      introduction: "Software engineer with a passion for AI and web development.",
      iconPath: "/icons/alice.png"
  },
  {
      name: "Bob Smith",
      introduction: "Cybersecurity expert and open-source enthusiast.",
      iconPath: "/icons/bob.png"
  },
  {
      name: "Charlie Davis",
      introduction: "Full-stack developer focusing on scalable applications.",
      iconPath: "/icons/charlie.png"
  },
  {
      name: "Diana Lopez",
      introduction: "UI/UX designer crafting intuitive and beautiful user experiences.",
      iconPath: "/icons/diana.png"
  },
  {
      name: "Ethan Brown",
      introduction: "Data scientist uncovering insights through machine learning.",
      iconPath: "/icons/ethan.png"
  }
];

interface Film {
  title: string;
  year: number;
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const topFilms = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
  },
  {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
      title: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];

/**
 * Generate a test data set
 * @returns 
 */
const refreshMessages = (): PersonInfo[] => {
  const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(15)).map(
    () => personInfoExamples[getRandomInt(personInfoExamples.length)],
  );
}

export const ListPartner = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<readonly Film[]>([]);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        (async () => {
            setLoading(true);
            await sleep(1e3); // For demo purposes.
            setLoading(false);

            setOptions([...topFilms]);
        })();
    };

    function sleep(duration: number): Promise<void> {
      return new Promise<void>((resolve) => {
          setTimeout(() => {
              resolve();
          }, duration);
      });
    }

    const handleClose = () => {
        setOpen(false);
        setOptions([]);
    };

    //Appbar Block
    const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);
    const isMenuOpen = Boolean(anchorEl);
    const { SecondaryAppBar, SecondaryAppBarContext } = useSecondaryAppBar({
      handleProfileMenuOpen: (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      },
      handleMenuClose: () => {    
        setAnchorEl(null);
      }
    });
    const appContext = use(SecondaryAppBarContext);

    const renderMenu = (ctxt: typeof appContext) => {
      const closeAll = () => {
        if(ctxt?.handleMobileMenuClose){
          ctxt?.handleMobileMenuClose();
        }        
        ctxt?.handleMenuClose();
      };
      
      return (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={ctxt?.handleMenuClose}
        >
          <MenuItem onClick={closeAll}>Profile</MenuItem>
          <MenuItem onClick={closeAll}>My account</MenuItem>
        </Menu>
      );
    };

    //Content Block
    const context = use(InnerFixedBottomNavContext);
    const [messages, setMessages] = useState(() => refreshMessages());

    //Avoid the navbar icon focus on wrong one after use route navigate feature
    useEffect(() => {
      context?.setValue(0);
    }, []);

    useEffect(() => {
        setMessages(refreshMessages());
    }, [context?.value]);
    
    return (
      <>      
        <SecondaryAppBar title="Partners" moreIcon={true}>
          {(ctxt) => (
            <>
              <SecAppBarMiddleBlock>
                <SearchInputAutoComplete 
                  open={open}
                  autoHighlight
                  onOpen={handleOpen}
                  onClose={handleClose}
                  isOptionEqualToValue={(option, value) => option.title === value.title}
                  getOptionLabel={(option) => option.title}
                  options={options}
                  loading={loading}
                  placeholder="Search…" />
              </SecAppBarMiddleBlock>
              <SecAppBarRightBlock>
                <CustomizedTooltip title="Messages" arrow placement="bottom"> 
                  <IconButton size="large" color="inherit">
                    <Badge badgeContent={4} color="error">
                      <IconProxy iconName="Email" />
                    </Badge>
                  </IconButton>
                </CustomizedTooltip>
                <CustomizedTooltip title="Notifications" arrow placement="bottom">
                  <IconButton size="large" color="inherit">
                    <Badge badgeContent={17} color="error">
                      <IconProxy iconName="Notifications" />
                    </Badge>
                  </IconButton>
                </CustomizedTooltip>
                <CustomizedTooltip title="Friend Request" arrow placement="bottom">
                  <IconButton size="large" color="inherit"
                  onClick={() => {
                    navigate('/partner/add', { replace: true });
                  }}>
                    <IconProxy iconName="PersonAdd" />
                  </IconButton>
                </CustomizedTooltip>
                <CustomizedTooltip title="Profile" arrow placement="bottom">
                  <IconButton
                    size="large"
                    color="inherit"
                    edge="end"
                    onClick={ctxt.handleProfileMenuOpen}
                  >
                    <IconProxy iconName="Account" />
                  </IconButton>
                </CustomizedTooltip>
              </SecAppBarRightBlock>

              <SecAppBarMobilePopBlock>
                <MenuItem>
                  <IconButton size="large" color="inherit">
                    <Badge badgeContent={4} color="error">
                      <IconProxy iconName="Email" />
                    </Badge>
                  </IconButton>
                  <p>Messages</p>
                </MenuItem>
                <MenuItem>
                  <IconButton size="large" color="inherit">
                    <Badge badgeContent={17} color="error">
                      <IconProxy iconName="Notifications" />
                    </Badge>
                  </IconButton>
                  <p>Notifications</p>
                </MenuItem>
                <MenuItem 
                  onClick={() => {
                    navigate('/partner/add', { replace: true });
                  }}>
                    <IconButton size="large" color="inherit">
                      <IconProxy iconName="PersonAdd" />
                    </IconButton>
                    <p>Friend Request</p>
                </MenuItem>
                <MenuItem onClick={ctxt.handleProfileMenuOpen}>
                  <IconButton color="inherit" size="large">
                    <IconProxy iconName="Account" />
                  </IconButton>
                  <p>Profile</p>
                </MenuItem>
              </SecAppBarMobilePopBlock>

              {renderMenu(ctxt)}
            </>
          )}
        </SecondaryAppBar>
        <List sx={{ pt: '3em' }} dense={true}>
            {messages.map(({ name: primary, introduction: secondary, iconPath: person }, index) => (
              <ListItem
                key={index + person}
                sx={{ padding: '1ch', minHeight: '4em' }}
              >
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={person} />
                  </ListItemAvatar>
                  <ListItemText primary={primary} secondary={secondary} />
                  <ListItemAvatar>
                    <Stack>
                      <IconButton>
                        <IconProxy iconName="Star" />
                      </IconButton>
                    </Stack>
                  </ListItemAvatar>
              </ListItem>
            ))}
        </List>
      </>
    )
}

export default ListPartner;