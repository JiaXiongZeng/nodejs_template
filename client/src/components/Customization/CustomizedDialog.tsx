import { 
  useState, forwardRef, useCallback, 
  useImperativeHandle, ReactElement, ReactNode 
} from 'react';
import { SxProps, Theme } from '@mui/system';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TransitionProps } from '@mui/material/transitions';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Silde from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import { IconProxy } from '@components/Customization/IconProxy.js';

const BootstrapDialog = styled(({ className, children, ...restProps}: DialogProps & {
  fullWidth?: boolean,
  fullHeight?: boolean
}) => (
  <Dialog {...restProps} classes={{ root: className }} >
    {children}
  </Dialog>
), 
{
  shouldForwardProp: prop => (prop !== "fullWidth") && (prop !== "fullHeight")
})
(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialogTitle-root+.MuiDialogContent-root': {
    paddingTop: theme.spacing(2)
  },
  variants: [
    {
      props: ({fullWidth}) => fullWidth,
      style: {
        '& .MuiDialog-paper': {
          [theme.breakpoints.down("xs")]:{
            width: `calc(100vw - ${theme.spacing(2)})`,
            maxWidth: `calc(100vw - ${theme.spacing(2)})`
          },
          [theme.breakpoints.up("sm")]: {
            width: `calc(100vw - ${theme.spacing(2)})`,
            maxWidth: `calc(100vw - ${theme.spacing(2)})`
          },
          [theme.breakpoints.up("md")]: {
            width: `calc(100vw - ${theme.spacing(4)})`,
            maxWidth: `calc(100vw - ${theme.spacing(4)})`
          },
          [theme.breakpoints.up("lg")]: {
            width: `calc(100vw - ${theme.spacing(6)})`,
            maxWidth: `calc(100vw - ${theme.spacing(6)})`
          }
        }
      }      
    },
    {
      props: ({fullHeight}) => fullHeight,
      style: {
        '& .MuiDialog-paper': {
          [theme.breakpoints.down("xs")]: {
            height: `calc(100vh - ${theme.spacing(2)})`,
            maxHeight: `calc(100vh - ${theme.spacing(2)})`
          },
          [theme.breakpoints.up("sm")]: {
            height: `calc(100vh - ${theme.spacing(2)})`,
            maxHeight: `calc(100vh - ${theme.spacing(2)})`
          },
          [theme.breakpoints.up("md")]: {
            height: `calc(100vh - ${theme.spacing(2)})`,
            maxHeight: `calc(100vh - ${theme.spacing(2)})`
          },
          [theme.breakpoints.up("lg")]: {
            height: `calc(100vh - ${theme.spacing(2)})`,
            maxHeight: `calc(100vh - ${theme.spacing(2)})`
          }
        }
      }
    }
  ]
}));

export type CustomizedDialogProps = Omit<DialogProps, 'ref'> & {
  titleId?: string,
  title?: ReactNode,
  titleSx?: SxProps<Theme>,
  fullWidth?: boolean,
  fullHeight?: boolean,
  closeButton?: boolean
};

export interface CustomizedDialogHandler {
    toggleOpen: (open: boolean) => void;
    setTitle: (title: string) => void;
};

const Transition = forwardRef(({children, ...restProps}: TransitionProps & {
  children: ReactElement<unknown, any>
}, ref) => (
  <Silde direction="up" ref={ref} {...restProps} >
    {children}
  </Silde>
));

export const CustomizedDialog
= forwardRef<CustomizedDialogHandler, CustomizedDialogProps>(({ 
  open, titleId, title, titleSx, children, PaperComponent: PaperComponentOriginal,
  closeButton, onClose: onCloseOriginal, 
  ...restProps }, ref
) => {
  const [isOpen, setIsOpen] = useState(open);
  const [theTitle, setTheTitle] = useState(title);
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleDialogClose = useCallback((event: {}, reason?: "backdropClick" | "escapeKeyDown") => {
      //Default customized action (such like clicking)
      if(!reason){
        setIsOpen(false);
      }

      //If provide onCloseOriginal event use the specified one
      if(onCloseOriginal && reason){
        onCloseOriginal(event, reason);
      }
  }, [isOpen, setIsOpen, onCloseOriginal]);

  const toggleOpen = useCallback((open: boolean) => {
    setIsOpen(open);
  }, [isOpen, setIsOpen]);

  const setTitle = useCallback((title: string) => {
    setTheTitle(title);
  }, [theTitle, setTheTitle]);

  useImperativeHandle(ref, () => ({
    toggleOpen: toggleOpen,
    setTitle: setTitle
  }), [toggleOpen, setTitle]);

  const defaultTitleSx: SxProps<Theme> = (theme) => ({ 
    m: 0, 
    p: 2, 
    minHeight: '48px',
    borderBottom: `1px solid ${theme.palette.grey[400]}`, // Add bottom border line            
  });

  return (
    <>
      <BootstrapDialog
        open={isOpen}
        fullScreen={fullScreen}
        TransitionComponent={Transition}
        onClose={handleDialogClose}
        {...restProps}
        PaperComponent={fullScreen? undefined: PaperComponentOriginal}
      >
        <DialogTitle id={titleId} 
                     sx={[
                      (theme) => ({ 
                        ...defaultTitleSx(theme), 
                        ...(typeof titleSx === "function" ? titleSx(theme) : titleSx)                        
                      }), 
                      (!fullScreen && PaperComponentOriginal? { cursor: 'move' }: {})
                     ]}>
          {theTitle}
        </DialogTitle>
        {
          closeButton !== undefined && !closeButton ?
          null :
          <IconButton
            onClick={handleDialogClose}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 14,
              color: theme.palette.grey[500],
            })}
          >
            <IconProxy iconName="Close" />
          </IconButton>
        }        
        {children}
      </BootstrapDialog>
    </>
  );
});

export default CustomizedDialog;