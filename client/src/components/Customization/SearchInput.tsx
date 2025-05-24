import { styled, alpha } from '@mui/material/styles';
import TextField, {TextFieldProps, textFieldClasses} from '@mui/material/TextField';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  }
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(({ className, size, slotProps: oriSlotProps, ...props }: TextFieldProps) => (
  <TextField size={size ?? "small"} {...props} classes={{ root: className }} slotProps={{
    ...oriSlotProps,
    ...{
      inputLabel:{
        sx: {
          '&[data-shrink="false"]': {
              paddingLeft: '2em'
          }          
        },
        ...oriSlotProps?.inputLabel
      }
    }
  }} />
))(({ theme }) => ({
  color: 'inherit',
  [`&.${textFieldClasses.root}`]: {
    transition: theme.transitions.create('width')
  },
  '& .MuiInputBase-root': {
    paddingLeft: '2.5em!important'
  },
  // '& .MuiAutocomplete-input': {
  //   minWidth: 'fit-content!important'
  // }
}));

export default Search;