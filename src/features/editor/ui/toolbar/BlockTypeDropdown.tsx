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
      <DropdownMenuTrigger className="px-3 py-1 border cursor-pointer rounded-md hover:bg-accent transition-colors duration-75 ">
        Open
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
