import Autocomplete, { AutocompleteProps, autocompleteClasses } from '@mui/material/Autocomplete';
import { ChipTypeMap } from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import { Search, StyledInputBase, SearchIconWrapper } from '@components/Customization/SearchInput';

export function SearchInputAutoComplete<T, 
                                        Multiple extends boolean | undefined = false,
                                        DisableClearable extends boolean | undefined = false,
                                        FreeSolo extends boolean | undefined = false,
                                        ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']>
(props: Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>, 'renderInput'> & {
    placeholder?: string;
    hoverHighlight?: boolean;
}) {
    const { placeholder, ...restProps } = props;
    return (
        <Search>
            <Autocomplete
                {...restProps}
                slotProps={{
                    listbox: {
                        sx: {
                            [`& .${autocompleteClasses.option}:hover`]: {
                                backgroundColor: "rgba(0,0,0,0.12)"
                            }
                        }
                    }
                }}
                renderInput={(params) => (
                    <>
                        <SearchIconWrapper>
                            {props.loading ? <CircularProgress color="inherit" size={20} /> : <SearchIcon />}
                        </SearchIconWrapper>
                        <StyledInputBase
                            {...params}
                            placeholder={placeholder}
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {params.InputProps.endAdornment}
                                        </>
                                    )
                                }
                            }} />
                    </>
                )}
            />
        </Search>
    );
}

export default SearchInputAutoComplete;