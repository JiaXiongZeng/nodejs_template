import { FC } from 'react';
import { Outlet, OutletProps, useLocation } from 'react-router';

interface ConditionalOutletProps extends OutletProps {
  show?: string[];
  dontShow?: string[];
}

export const ConditionalOutlet: FC<ConditionalOutletProps> = ({
  show, dontShow, ...restProps
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const shouldShow =
    (show ? show.includes(currentPath) : true) &&
    (dontShow ? !dontShow.includes(currentPath) : true);

  return shouldShow ? <Outlet {...restProps} /> : null;
};
