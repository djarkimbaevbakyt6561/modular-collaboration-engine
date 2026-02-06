import {MenuButton} from "@/src/shared/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../../shared/ui/DropdownMenu";
import {ToolBarItemType} from "../../model/editor.types";

export const BlockTypeDropdown = ({
  menuItems,
}: {
  menuItems: ToolBarItemType[];
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MenuButton title="Text type">Text type</MenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Turn into</DropdownMenuLabel>

        {menuItems.map(({label, icon: Icon, action, isActive}) => (
          <DropdownMenuItem
            key={label}
            onClick={action}
            isActive={isActive}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Icon size={18} /> {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
