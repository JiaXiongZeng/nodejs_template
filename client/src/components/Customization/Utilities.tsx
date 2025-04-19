import { ComponentType } from 'react';

/**
 * High Order Component (HOC)
 * @param Component Component to be injected default property values
 * @param defaultProps Object with default property values
 * @returns 
 */
export const withDefaults = <P=unknown>(Component: ComponentType<P>, defaultProps: Partial<P>) => {
    return (props: P) => <Component {...defaultProps} {...props} />;
}