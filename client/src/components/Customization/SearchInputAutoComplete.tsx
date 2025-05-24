import { ReactNode } from 'react';
import Autocomplete, { AutocompleteProps, autocompleteClasses, AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { ChipTypeMap } from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';

import { IconProxy } from '@components/Customization/IconProxy.js';
import { Search, StyledInputBase, SearchIconWrapper } from '@components/Customization/SearchInput';

export function SearchInputAutoComplete<T, 
                                        Multiple extends boolean | undefined = false,
                                        DisableClearable extends boolean | undefined = false,
                                        FreeSolo extends boolean | undefined = false,
                                        ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']>
(props: Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>, 'renderInput'> & {
    placeholder?: string;
    hoverHighlight?: boolean;
    renderInput?: (params: AutocompleteRenderInputParams) => ReactNode;
}) {
    const { placeholder, renderInput: oriRenderInput, ...restProps } = props;
    return (
        <Search>
            <Autocomplete
                {...restProps}
                slotProps={{
                    listbox: {
                        sx: {
                            [`& .${autocompleteClasses.option}:hover`]: {
                                backgroundColor: "rgba(0,0,0,0.12)"
                            },
                            [`& .${autocompleteClasses.option}.Mui-focused`]: {
                                backgroundColor: "rgba(0,0,0,0.12)"
                            }
                        }
                    }
                }}
                renderInput={(params) => (
                    <>
                        <SearchIconWrapper>
                            {
                                props.loading ? 
                                <CircularProgress color="inherit" size={20} /> : 
                                <IconProxy iconName="Search" />
                            }
                        </SearchIconWrapper>
                        {
                            oriRenderInput ?
                                oriRenderInput(params) :
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
                        }                        
                    </>
                )}
            />
        </Search>
    );
}

export default SearchInputAutoComplete;