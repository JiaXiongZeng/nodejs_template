import { useRef, useMemo, useReducer, useEffect, FC } from 'react';
import 
{ 
    UserContext, UserReducerContext, UserInfo, 
    UserContextAction, UserContextActionType 
} from '@components/Contexts/UserContext.js';

export const UserContextProvider: FC<{children: any}> = ({children}) => {    
    const onChangeRef = useRef<(() => void) | undefined>(null);
    const reducer = (state: Nullable<UserInfo>, action: UserContextAction) => {
        switch (action.type) {
            case UserContextActionType.CLEAR:
                onChangeRef.current = action.onChanged;
                return null;
            case UserContextActionType.SET:            
                onChangeRef.current = action.onChanged;
                return (action.data? action.data: null);
            default:
                return state;
        }
    };
    const [contextState, contextDispatch] = useReducer(reducer, null);
    const memoChildren = useMemo(() => children, [contextState, contextDispatch]);

    useEffect(() => {
        const onChangedCallback = onChangeRef.current;
        if (onChangedCallback) {
            onChangedCallback();
        }
    }, [onChangeRef.current]);

    return (
        <UserContext.Provider value={contextState}>
            <UserReducerContext.Provider value={contextDispatch}>
                {memoChildren}
            </UserReducerContext.Provider>
        </UserContext.Provider>
    );
}