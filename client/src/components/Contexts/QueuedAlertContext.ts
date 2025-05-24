import { createContext, useContext } from 'react';
import { QueuedAlertManagerHandle } from '@components/Customization/QueuedAlertManager.js';

export const QueuedAlertContext = createContext<Nullable<QueuedAlertManagerHandle>>(null);

export const useQueuedAlert = () => {
    const ctx = useContext(QueuedAlertContext);
    if (!ctx) throw new Error("useQueuedAlert muse be used within QueuedAlertProvider");
    return ctx;
}