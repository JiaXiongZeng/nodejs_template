import { useState, useEffect, ReactNode } from 'react';
import { styled } from '@mui/material';

import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import IconButton from '@mui/material/IconButton';
import { IconProxy } from '@components/Customization/IconProxy.js';

const Handler = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main, // Use theme primary main color
    color: '#fff',
    fontSize: '16px',
    fontWeight: '1.5',
    borderRadius: '8px',
    padding: '0px 16px !important',
    boxShadow: theme.shadows[4]
}));

interface CollapsableHandlerProps {
    title?: string | ReactNode;
    expaned?: boolean;
    children?: ReactNode;
    toggle?: () => void;
}


export const CollapsableHandler = ({ title, expaned, toggle, children }: CollapsableHandlerProps) => {
    const [isExpanded, setExpanded] = useState(expaned);

    useEffect(() => {
        setExpanded(expaned);
    }, [expaned])

    return (
        <>
            <ListItem component={Handler} sx={{
                cursor: 'pointer'
            }} onClick={toggle}>                            
                <ListItemText primary={title} />
                { isExpanded 
                    ? 
                        <IconButton>
                            <IconProxy iconName="Collapse" />
                        </IconButton>
                    : 
                        <IconButton>
                            <IconProxy iconName="Expand" />
                        </IconButton>
                }                           
            </ListItem>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit >
                {children}
            </Collapse>
        </>
    );
}