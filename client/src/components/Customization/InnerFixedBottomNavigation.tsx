import { use, FC, ReactElement, createContext } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { drawerMaxWidth, PageLayoutContext } from './PageLayout';

const openedMixin = (theme: Theme): CSSObject => ({
  left: drawerMaxWidth,
  transition: theme.transitions.create('left', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('left', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  left: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    left: `calc(${theme.spacing(8)} + 1px)`
  }
});

interface IInnerFixedBottomNavContext {
  value: any,
  setValue: (newVal: any) => void
}

export const InnerFixedBottomNavContext = createContext<Nullable<IInnerFixedBottomNavContext>>(null);

interface BottomNavitagorPaperProp {
    open?: boolean
}

const BottomNavigationPaper = styled(Paper, {
    shouldForwardProp: (propName) => propName != 'open'
})<BottomNavitagorPaperProp>(({theme}) => ({
    variants: [
        {
          props: ({ open }) => open,
          style: {
            ...openedMixin(theme)
          }
        },
        {
          props: ({ open }) => !open,
          style: {
            ...closedMixin(theme)
          }
        }
    ]
}));

export const InnerFixedBottomNavigation:FC<{ children?: ReactElement<typeof BottomNavigationAction>[] }> = ({children}) => {
  const pgContext = use(PageLayoutContext);
  const navContext = use(InnerFixedBottomNavContext);

  return (
    <BottomNavigationPaper open={pgContext?.open} sx={{ position: 'fixed', bottom: 0, right: 0}} elevation={3}>
        <BottomNavigation
          showLabels
          value={navContext?.value}
          onChange={(_e, newValue) => {
            navContext?.setValue(newValue);
          }}
        >
          {children}
        </BottomNavigation>
    </BottomNavigationPaper> 
  );
}

export default InnerFixedBottomNavigation;