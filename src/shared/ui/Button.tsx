import {ComponentPropsWithoutRef} from "react";
import {cn} from "../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip"; // Adjust path to your UI components

interface MenuButtonProps extends ComponentPropsWithoutRef<"button"> {
  onClick?: () => void;
  disabled?: boolean;
  isActive?: boolean;
  children: React.ReactNode;
  title: string; // New required prop for accessibility
  className?: string;
  withoutTooltip?: boolean;
}

export function MenuButton({
  onClick,
  disabled = false,
  isActive = false,
  children,
  title,
  className,
  withoutTooltip = false,
  ...props
}: MenuButtonProps) {
  if (withoutTooltip) {
    return (
      <button
        type="button" // Always specify type for buttons in forms
        onClick={onClick}
        disabled={disabled}
        aria-label={title}
        aria-pressed={isActive} // Crucial for screen reader accessibility
        className={cn(
          "inline-flex items-center justify-center px-2 py-1.5 text-sm border border-border rounded-md hover:bg-accent cursor-pointer transition-colors duration-75 disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isActive &&
            "text-secondary-gold! border-secondary-gold/50 bg-secondary-gold/10",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button" // Always specify type for buttons in forms
            onClick={onClick}
            disabled={disabled}
            aria-label={title}
            aria-pressed={isActive} // Crucial for screen reader accessibility
            className={cn(
              "inline-flex items-center justify-center px-2 py-1.5 text-sm border border-border rounded-md hover:bg-accent cursor-pointer transition-colors duration-75 disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive &&
                "text-secondary-gold! border-secondary-gold/50 bg-secondary-gold/10",
              className,
            )}
            {...props}
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface LinkButton extends ComponentPropsWithoutRef<"a"> {
  title: string; // New required prop for accessibility
}

export const LinkButton = ({
  title,
  children,
  className,
  ...props
}: LinkButton) => {
  return (
    <a
      type="button" // Always specify type for buttons in forms
      aria-label={title}
      className={cn(
        "inline-flex items-center justify-center px-2 py-1.5 text-sm border border-border rounded-md hover:bg-accent cursor-pointer transition-colors duration-75 disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
};
