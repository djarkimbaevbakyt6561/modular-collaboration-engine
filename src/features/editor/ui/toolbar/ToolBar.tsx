// MenuBar.tsx
import {useTiptap, useTiptapState} from "@tiptap/react";
import {toolBarStateSelector} from "../../model/editor.state";
import {MenuButton} from "@/src/shared/ui/Button"; // Import the new component

import {BlockTypeDropdown} from "./BlockTypeDropdown";
import {ToolBarItemType} from "../../model/editor.types";
import {getToolbarGroups} from "../../model/editor.commands";
import {Eraser, ImagePlus, SeparatorHorizontal} from "lucide-react";
import {LinkDropdown} from "./LinkDropdown";
import {AIDropdown} from "./AIDropdown";

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
    items.map(({label, icon: Icon, action, isActive, disabled}) => (
      <MenuButton
        key={label}
        title={label}
        onClick={action}
        isActive={isActive}
        disabled={disabled}
      >
        <Icon size={18} />
      </MenuButton>
    ));

  return (
    <div className="absolute">
      <div className="flex gap-2 flex-wrap">
        <div className="flex gap-1 border-r pr-2">
          <AIDropdown editor={editor} />
        </div>
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
            title="Eraser"
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
          >
            <Eraser size={18} />
          </MenuButton>
          <BlockTypeDropdown menuItems={groups.blockType} />
          <LinkDropdown editor={editor} />
          <MenuButton
            title="Separator Horizontal"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <SeparatorHorizontal size={18} />
          </MenuButton>
        </div>

        {/* Alignment Group */}
        <div className="flex gap-1 border-r pr-2">
          {renderButtons(groups.alignment)}
        </div>
        <MenuButton
          title="Add Image"
          className="flex gap-2"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertContent({type: "imageDrop"})
              .newlineInCode()
              .run()
          }
        >
          <ImagePlus size={18} /> Add
        </MenuButton>
      </div>
    </div>
  );
}
