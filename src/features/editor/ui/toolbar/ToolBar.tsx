// MenuBar.tsx
import {useTiptap, useTiptapState} from "@tiptap/react";
import {toolBarStateSelector} from "../../model/editor.state";
import {MenuButton} from "../../../../shared/ui/MenuButton"; // Import the new component

import {BlockTypeDropdown} from "./BlockTypeDropdown";
import {ToolBarItemType} from "../../model/editor.types";
import {getToolbarGroups} from "../../model/editor.commands";
import {Eraser, SeparatorHorizontal} from "lucide-react";

export function ToolBar() {
  const {editor, isReady} = useTiptap();
  const editorState = useTiptapState(toolBarStateSelector) as ReturnType<
    typeof toolBarStateSelector
  >;
  if (!isReady || !editor || !editorState) {
    return null;
  }
  const groups = getToolbarGroups(editor, editorState);

  const renderButtons = (items: ToolBarItemType[]) =>
    items.map(({icon: Icon, action, isActive, disabled}, index) => (
      <MenuButton
        key={index}
        onClick={action}
        isActive={isActive}
        disabled={disabled}
      >
        <Icon size={18} />
      </MenuButton>
    ));

  return (
    <div className="control-group">
      <div className="flex gap-2 flex-wrap">
        {/* History Group */}
        <div className="flex gap-1 border-r pr-2">
          {renderButtons(groups.history)}
        </div>

        {/* Marks Group */}
        <div className="flex gap-1 border-r pr-2">
          {renderButtons(groups.marks)}
        </div>

        {/* Utilities (Static list since they are unique) */}
        <div className="flex gap-1 border-r pr-2">
          <MenuButton
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
          >
            <Eraser size={18} />
          </MenuButton>
          <BlockTypeDropdown menuItems={groups.blockType} />
          <MenuButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <SeparatorHorizontal size={18} />
          </MenuButton>
        </div>



        {/* Alignment Group */}
        <div className="flex gap-1">{renderButtons(groups.alignment)}</div>
      </div>
    </div>
  );
}
