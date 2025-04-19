import { styled, alpha } from '@mui/material/styles';
import TextField, {TextFieldProps, textFieldClasses} from '@mui/material/TextField';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
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

export const StyledInputBase = styled(({ className, size, ...props }: TextFieldProps) => (
  <TextField size={size ?? "small"} {...props} classes={{ root: className }} />
))(({ theme }) => ({
  color: 'inherit',
  [`&.${textFieldClasses.root}`]: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    //paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
    },
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
    [theme.breakpoints.up('lg')]: {
      width: '80ch',
    }  
  },
  // placeholder style
  '& input::placeholder': {
    textIndent: '2em',
  },
  // input box style
  '& .MuiInputBase-input': {
    textIndent: '2em',
  }
}));

export default Search;