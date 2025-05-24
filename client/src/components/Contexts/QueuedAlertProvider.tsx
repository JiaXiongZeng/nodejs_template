import { useRef, FC } from 'react';
import { QueuedAlertManager, QueuedAlertManagerHandle } from '@components/Customization/QueuedAlertManager.js';
import { QueuedAlertContext } from '@components/Contexts/QueuedAlertContext.js';

export const QueuedAlertProvider: FC<{children: any}> = ({children}) => {
    const refAlert = useRef<Nullable<QueuedAlertManagerHandle>>(null);
    return (
        <QueuedAlertContext.Provider value={{ pushAlert: (severity, text) => refAlert.current?.pushAlert(severity, text) }}>
            {children}
            <QueuedAlertManager ref={refAlert} withBackdrop maxVisible={6} />
        </QueuedAlertContext.Provider>
    )
 }