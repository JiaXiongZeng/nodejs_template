import { useState, RefObject } from 'react';
import { SxProps, Theme } from '@mui/system';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { AutocompleteProps } from '@mui/material/Autocomplete';
import { ChipTypeMap } from '@mui/material/Chip';
import { StyledInputBase } from '@components/Customization/SearchInput.js';
import { SearchInputAutoComplete } from '@components/Customization/SearchInputAutoComplete.js';

type MultipleSelectAutoCompleteProps<T extends Record<string, any>, NameKey extends keyof T, IsOthersFlagKey extends keyof T> = 
{
    nameKey: NameKey,
    isOthersFlagKey: IsOthersFlagKey,
    othersSuffix?: string,
    othersSx?: SxProps<Theme>,
    inputLabel?: string,
    inputPlaceholder?: string,
    fullWidth?: boolean,
    initialOptions: T[]
} & 
(
    T[NameKey] extends string ? {} : { ERROR_nameKey_must_point_to_string: never }
) & 
(
    T[IsOthersFlagKey] extends boolean|undefined ? {} : { ERROR_judgeFlag_must_point_to_boolean: never }
);

export const MultipleSelectAutoComplete = <
                               T extends Record<string, any>, 
                               NameKeyType extends keyof T,
                               IsOthersFlagKeyType extends keyof T,                       
                               Multiple extends boolean | undefined = true,
                               DisableClearable extends boolean | undefined = false,
                               FreeSolo extends boolean | undefined = true,
                               ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']>
({ nameKey, isOthersFlagKey, othersSuffix, othersSx, inputLabel, inputPlaceholder, fullWidth, initialOptions, ref, inputRef }: 
    Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>, 'renderInput' | 'options'> & 
    {
        inputRef?: RefObject<HTMLDivElement | null> | null
    } &
    MultipleSelectAutoCompleteProps<T, NameKeyType, IsOthersFlagKeyType>
) => {
    const [value, setValue] = useState<T[]>([]);
    const [inputValue, setInputValue] = useState('');

    // Check if user is typing a duplicate
    const isDuplicate = value.some(
        (v) => v[nameKey].toLowerCase() === inputValue.toLowerCase()
    );

    // Handle input change and prevent typing duplicates
    const handleInputChange = (_: any, newInput: string) => {
        setInputValue(newInput);
    };

    const similarityScore = (option: string, input: string): number => {
        if (option === input) return 100;
        if (option.startsWith(input)) return 90;
        if (option.includes(input)) return 75;
        return 0;
    };

    return (
        <SearchInputAutoComplete
            multiple
            freeSolo
            autoHighlight
            ref={ref}
            onInputChange={handleInputChange}
            inputValue={inputValue}
            options={initialOptions as T[]}
            value={value}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option[nameKey])}
            isOptionEqualToValue={(option, val) => option[nameKey] === val[nameKey]}
            filterOptions={(options, state) => {
                const input = state.inputValue.toLowerCase();

                const filtered = options
                    .filter((opt) =>
                        !value.some((v) => v[nameKey].toLowerCase() === opt[nameKey].toLowerCase())
                    )
                    .map(opt => ({
                        ...opt,
                        score: similarityScore(opt[nameKey].toLowerCase(), input)
                    }))
                    .sort((a, b) => b.score - a.score) // sort by descending similarity
                    .filter(opt => opt.score > 0) // exclude the scored 0 options
                    .map(({ score, ...opt }) => opt); // remove score

                const exactMatchExists = options.some(
                    (opt) => opt[nameKey].toLowerCase() === input
                );

                if (input !== '' && !exactMatchExists) {
                    filtered.push({ [nameKey]: state.inputValue, [isOthersFlagKey]: true } as any);
                }

                return filtered as any[];
            }}
            onChange={(_, newValueRaw) => {
                const distinctElem = newValueRaw.filter(
                    (item, index) => {
                        const findIdx = newValueRaw.findIndex(
                            (ele) => {
                                const eleName = (typeof ele === 'string' ? ele : ele[nameKey]) as string;
                                const itemName = (typeof item === 'string' ? item : item[nameKey]) as string;
                                return eleName.toLowerCase() === itemName.toLowerCase();
                            });
                        return findIdx === index;
                    }
                );

                const normalized = distinctElem.map((item) => {
                    if (typeof item === "string") {
                        const fromOption = initialOptions.find(ele => ele[nameKey].toLowerCase() === item.toLowerCase());
                        if (fromOption) {
                            return { ...fromOption } as T;
                        } else {
                            return { [nameKey]: item, [isOthersFlagKey]: true } as T;
                        }
                    }
                    return { ...item };
                });

                setValue(normalized);
                setInputValue('');
            }}
            renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                    <Chip
                        label={option[isOthersFlagKey] ? `${option[nameKey]}${(othersSuffix? othersSuffix: '')}` : option[nameKey]}
                        {...getTagProps({ index })}
                        key={`chip_${index}`}
                        sx={{ 
                            ...(
                                  option[isOthersFlagKey]? 
                                  {
                                     //Default others styles
                                     backgroundColor: theme => theme.palette.info.light,
                                     ...othersSx
                                  }: 
                                  {}
                               )
                        }}
                    />
                ))
            }
            renderOption={(props, option, {index}) => {
                const isAlreadySelected = value.some(
                    (v) => v[nameKey].toLowerCase() === option[nameKey].toLowerCase()
                );

                return (
                    <Box
                        component="li"
                        {...props}
                        sx={{
                            opacity: isAlreadySelected ? 0.5 : 1,
                            pointerEvents: isAlreadySelected ? 'none' : 'auto',                            
                        }}
                        key={`option_li_${index}`}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography>{option[nameKey]}</Typography>
                            {isAlreadySelected && (
                                <Typography
                                    variant="caption"
                                    color="error"
                                    sx={{ fontStyle: 'italic' }}
                                >
                                    Already selected, deselect now?
                                </Typography>
                            )}
                        </Box>
                    </Box>
                );
            }}
            renderInput={(params) => (
                <StyledInputBase
                    {...params}
                    fullWidth={fullWidth}
                    label={inputLabel}
                    placeholder={inputPlaceholder}
                    helperText={
                        isDuplicate && inputValue
                            ? `"${inputValue}" is already selected`
                            : ''
                    }
                    slotProps={{
                        input: {
                            sx: {
                                ...(!fullWidth? {width: '235px'}: {})
                            },
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {params.InputProps.endAdornment}
                                </>
                            )
                        }
                    }}
                    error={isDuplicate && inputValue !== ''}
                    inputRef={inputRef}
                />
            )}            
        />
    );
};
