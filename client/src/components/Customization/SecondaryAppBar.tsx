import 
{
    use, useState, useMemo, createContext, Context, Children,
    ReactNode, ReactElement, MouseEvent, FC, DependencyList
} from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import { withDefaults } from '@components/Customization/Utilities';
import { drawerMaxWidth, PageLayoutContext } from "@components/Customization/PageLayout";

export const SecAppBarMiddleBlock: FC<{children?: ReactNode | ReactNode[] }> = ({ children }) => (<>{children}</>);
export const SecAppBarRightBlock: FC<{children?: ReactNode | ReactNode[]}> = ({ children }) => (<>{children}</>);
export const SecAppBarMobilePopBlock: FC<{children?: ReactNode | ReactNode[]}> = ({ children }) => (<>{children}</>);

// type SecondaryAppBarChildren = {
//   children:  [ 
//     ReactElement<typeof SecAppBarMiddleBlock>, 
//     ReactElement<typeof SecAppBarRightBlock>, 
//     ReactElement<typeof SecAppBarMobilePopBlock>,
//     ...ReactNode[]
//   ]
// } & Omit<ReactElement<any>, 'children'>;

type SecondaryAppBarChildrenTemplate = ReactElement<[
  ReactElement<typeof SecAppBarMiddleBlock>,
  ReactElement<typeof SecAppBarRightBlock>,
  ReactElement<typeof SecAppBarMobilePopBlock>,
  ...ReactNode[]
]>;

type SecondaryAppBarChildren<T=SecondaryAppBarContextProps> = (contextValue: T & SecondaryAppBarContextProps) => 
  ReactElement<{
    children?: SecondaryAppBarChildrenTemplate
  }>;

type SecondaryAppBarProps<T=SecondaryAppBarContextProps> = {
    title?: string,
    context?: Context<Nullable<T & SecondaryAppBarContextProps>>,
    children: SecondaryAppBarChildren<T>
} & Omit<MuiAppBarProps, 'children'>;

interface SecondaryAppBarContextBasicProps {
    readonly handleMobileMenuOpen?: (event: MouseEvent<HTMLElement>) => void,
    readonly handleMobileMenuClose?: () => void
}

type SecondaryAppBarContextProps = SecondaryAppBarContextBasicProps;

export const createSecondaryAppBarContext = <T=SecondaryAppBarContextProps>(initContext: Nullable<T & SecondaryAppBarContextProps>) => (
    createContext<Nullable<T & SecondaryAppBarContextProps>>(initContext)
);

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer,
    top: 'auto',   
    variants: [
      {
        props: ({ open }) => open,
        style: {
          marginLeft: drawerMaxWidth,
          width: `calc(100% - ${drawerMaxWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }
      },
      {
        props: ({ open }) => !open,
        style: {
          width: `calc(100% - ${theme.spacing(7)})`,
          [theme.breakpoints.up('sm')]: {
              width: `calc(100% - ${theme.spacing(8)})`
          },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }
      }
    ]
}));

export const SecondaryAppBar = <T=SecondaryAppBarContextProps>({ title, children, context, ...restAppBarProps }: SecondaryAppBarProps<T>) => {
  const pageLayoutCtxt = use(PageLayoutContext);
  const ContextComp = context || createSecondaryAppBarContext({} as T & SecondaryAppBarContextProps);
  const initialContext = use(ContextComp);
  const { handleMobileMenuOpen: a, handleMobileMenuClose: b, ...restCtxProps } = initialContext!;

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<Nullable<HTMLElement>>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // Avoid re-rendering the context value
  const contextValue = useMemo(() => {
    return {
      handleMobileMenuOpen,
      handleMobileMenuClose,
      ...restCtxProps
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
        <ContextComp value={contextValue as T & SecondaryAppBarContextProps}>
            <ContextComp.Consumer>
              {(currentContext) => {
                // Execute the `children` context callback to get the blocks
                const element = children(currentContext!);
                const [
                  middleBlock,
                  rightBlock,
                  mobilePopBlock,
                  ...restChildren
                ] = Children.toArray(element.props.children);

                return (
                  <>
                    <AppBar {...restAppBarProps} open={pageLayoutCtxt?.open} variant='outlined' color="default" >
                        <Toolbar variant="dense" >          
                            {
                                title && 
                                <Box sx={{ flexGrow: 1 }} >
                                    <Typography 
                                        variant="h6" 
                                        sx={{
                                            display: { xs: 'none', sm: 'block' }
                                        }}
                                        noWrap
                                    >
                                        {title}
                                    </Typography>
                                </Box>
                            }
                            {middleBlock}
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                {rightBlock}
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                size="large"
                                color="inherit"
                                onClick={handleMobileMenuOpen}
                                >
                                  <MoreIcon />
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <Menu
                      anchorEl={mobileMoreAnchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={isMobileMenuOpen}
                      onClose={handleMobileMenuClose}
                    >
                      {mobilePopBlock}
                    </Menu>
                    {restChildren}
                  </>
                );
              }}
            </ContextComp.Consumer>            
        </ContextComp>      
    </Box>
  );
}


/**
 * Hook to create a secondary app bar
 * @param initContext the initial context to be used
 * @returns components and context
 */
export const useSecondaryAppBar = <T=SecondaryAppBarContextProps>(
  initContext?: Nullable<T & SecondaryAppBarContextProps>, 
  deps?: DependencyList
) => {
    return useMemo(() => {
      const ctxt = createSecondaryAppBarContext<T>(initContext || {} as T & SecondaryAppBarContextProps);
      const componet = withDefaults<SecondaryAppBarProps<T>>(SecondaryAppBar, { context: ctxt });
      
      return {
          SecondaryAppBar: componet,
          SecondaryAppBarContext: ctxt        
      }
    }, deps || []);
}

export default SecondaryAppBar;