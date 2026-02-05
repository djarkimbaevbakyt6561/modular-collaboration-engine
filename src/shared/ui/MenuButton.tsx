import { cn } from "../lib/utils";

// MenuButton.tsx
interface MenuButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
  children: React.ReactNode;
}

export function MenuButton({
  onClick,
  disabled = false,
  isActive = false,
  children,
}: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-2 py-1 text-sm border border-border rounded-md hover:bg-accent cursor-pointer transition-colors duration-75",
        isActive && "text-secondary-gold!",
      )}
    >
      {children}
    </button>
  );
}
