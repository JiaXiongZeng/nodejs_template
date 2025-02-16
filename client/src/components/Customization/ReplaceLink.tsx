import { AnchorHTMLAttributes, forwardRef } from 'react';
import { useNavigate } from 'react-router';

interface ReplaceLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  replace?: boolean;
}

const ReplaceLink = forwardRef<HTMLAnchorElement, ReplaceLinkProps>(
  ({ to, replace = false, onClick, children, ...rest }, ref) => {
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      //Original 
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        // If the event wasn't already handled, navigate
        event.preventDefault();
        navigate(to, { replace });
      }
    };

    return (
      <a ref={ref} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }
);

export default ReplaceLink;