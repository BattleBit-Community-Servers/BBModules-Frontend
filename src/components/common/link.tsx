import { forwardRef, RefAttributes } from "react";
import { cn } from "../../lib/utils.ts";
import { Link, LinkProps } from "react-router-dom";

export const BBLink = forwardRef<HTMLAnchorElement, LinkProps & RefAttributes<HTMLAnchorElement>>(
    ({ className, ...props }, ref) => {
        // `children` is passed through via `props`
        return (
            <Link
                ref={ref}
                {...props}
                className={cn(
                    "relative text-primary transition-colors hover:text-blue-600",
                    "before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:w-full before:origin-center before:scale-0 before:bg-blue-600 before:transition-[transform] hover:before:scale-100",
                    className
                )}
            />
        );
    }
);

BBLink.displayName = "BBLink";
