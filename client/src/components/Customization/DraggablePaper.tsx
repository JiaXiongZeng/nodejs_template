import { RefObject, useRef, useCallback } from 'react';
import Draggable from 'react-draggable';
import Paper, { PaperProps, paperClasses } from '@mui/material/Paper';

/**
 * A hook to use DraggablePaper component
 * @param handle the html selector used to initiate drag (such like dialog title)
 * @param cancelClass the html selector used to prevent drage initialization (such like dialog content)
 * @returns 
 */
export const useDraggablePaper = (handle: string, cancelClass: string) => {
    const paper = useCallback((props: PaperProps) => {
        const nodeRef = useRef<HTMLDivElement>(null);
        return(
            <Draggable
                nodeRef={nodeRef as RefObject<HTMLDivElement>}
                handle={handle}
                cancel={cancelClass}
                bounds="parent"
            >
                <Paper {...props} ref={nodeRef} sx={{
                    [`&.${paperClasses.root}`]: {
                        margin: '0!important'
                    }
                }} />
            </Draggable>
        );
    }, [handle, cancelClass]);
    return paper;
}