import { styled } from '@mui/material';
import ListItem, { ListItemProps } from '@mui/material/ListItem';

export const ListItemWithDisabled = styled(ListItem, {
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