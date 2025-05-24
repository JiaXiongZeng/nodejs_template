import { useEffect, useImperativeHandle, useRef, useState, forwardRef } from 'react';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';

export type AlertMessage = {
    id: number;
    severity: 'success' | 'info' | 'warning' | 'error';
    text?: string;
};

export type QueuedAlertManagerProps = {
    maxVisible?: number;
    withBackdrop?: boolean;
};

export type QueuedAlertManagerHandle = {
    pushAlert: (severity: AlertMessage['severity'], text?: string) => void;
};

export const QueuedAlertManager = forwardRef<QueuedAlertManagerHandle, QueuedAlertManagerProps>(
    ({ maxVisible = 3, withBackdrop = false }, ref) => {
        const [visibleAlerts, setVisibleAlerts] = useState<AlertMessage[]>([]);
        const [exitingIds, setExitingIds] = useState<Set<number>>(new Set());
        const queueRef = useRef<AlertMessage[]>([]);
        const idRef = useRef(0);
        const DISPLAY_DURATION = 2800;

        const processQueue = () => {
            if (
                visibleAlerts.length - exitingIds.size >= maxVisible ||
                queueRef.current.length === 0
            )
                return;

            const next = queueRef.current.shift()!;
            setVisibleAlerts((prev) => [...prev, next]);

            setTimeout(() => {
                setExitingIds((prev) => new Set(prev).add(next.id));
            }, DISPLAY_DURATION);
        };

        useEffect(() => {
            if (
                visibleAlerts.length - exitingIds.size < maxVisible &&
                queueRef.current.length > 0
            ) {
                const timer = setTimeout(processQueue, 300);
                return () => clearTimeout(timer);
            }
        }, [visibleAlerts, exitingIds]);

        useImperativeHandle(ref, () => ({
            pushAlert: (severity, text) => {
                const newAlert: AlertMessage = {
                    id: ++idRef.current,
                    severity,
                    text,
                };
                queueRef.current.push(newAlert);
                processQueue();
            },
        }));

        const handleExited = (id: number) => {
            setVisibleAlerts((prev) => prev.filter((a) => a.id !== id));
            setExitingIds((prev) => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
        };

        return (
            <>
                {withBackdrop && visibleAlerts.length > 0 && (
                    <Backdrop open sx={{ zIndex: 1200 }} />
                )}
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1300,
                        pointerEvents: 'none',
                    }}
                >
                    <Stack spacing={2} alignItems="center">
                        {visibleAlerts.map((alert) => (
                            <Fade
                                key={alert.id}
                                in={!exitingIds.has(alert.id)}
                                timeout={500}
                                onExited={() => handleExited(alert.id)}
                            >
                                <Alert
                                    severity={alert.severity}
                                    variant="filled"
                                    sx={{ minWidth: 300 }}
                                >
                                    {alert.text}
                                </Alert>
                            </Fade>
                        ))}
                    </Stack>
                </Box>
            </>
        );
    }
);

export default QueuedAlertManager;  