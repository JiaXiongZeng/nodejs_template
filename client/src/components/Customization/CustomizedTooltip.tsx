import { styled } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

//Create a customized style tooltip component
export const CustomizedTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{tooltip: className}} />
  ))(({ theme }) => ({
    // Override Tooltip style
    [`&.${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.primary.main, // Use theme primary main color
      color: '#fff',
      fontSize: '16px',
      fontWeight: '1.5',
      borderRadius: '8px',
      padding: '8px 16px',
      boxShadow: theme.shadows[4],    
    },
    // Override Arrow style
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.primary.main, // Make arrow color same as the tooltip
    },
    marginTop: '0px!important'
}));