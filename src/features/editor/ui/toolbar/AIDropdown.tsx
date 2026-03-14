"use client";
import {
  DotLoader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  MenuButton,
} from "@/src/shared/ui";
import {Editor} from "@tiptap/react";
import {DOMSerializer} from "@tiptap/pm/model";
import {ArrowUp, CircleStop, Menu} from "lucide-react";
import {useState, useRef, useEffect} from "react";
import {useCompletion} from "@ai-sdk/react";
import ArtificialIntelligenceIcon from "../../assets/ai.svg";

export const AIDropdown = ({editor}: {editor: Editor}) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedHtml, setSelectedHtml] = useState("");
  const previousLength = useRef(0);
  const [isSelectionEmpty, setIsSelectionEmpty] = useState(
    editor.state.selection.empty,
  );

  const {
    complete,
    completion,
    isLoading,
    input,
    handleInputChange,
    setCompletion,
    setInput,
    stop,
  } = useCompletion({
    api: "/api/completion",
    onFinish: () => {
      setOpen(false);
      previousLength.current = 0;
      setCompletion("");
      setInput("");
    },
    onError: () => {
      previousLength.current = 0;
      setCompletion("");
      setInput("");
    },
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const updateSelectionState = () =>
      setIsSelectionEmpty(editor.state.selection.empty);

    updateSelectionState();
    editor.on("selectionUpdate", updateSelectionState);
    editor.on("transaction", updateSelectionState);

    return () => {
      editor.off("selectionUpdate", updateSelectionState);
      editor.off("transaction", updateSelectionState);
    };
  }, [editor]);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (open) {
      previousLength.current = 0;
      const {from, to} = editor.state.selection;

      const slice = editor.state.doc.slice(from, to);
      const serializer = DOMSerializer.fromSchema(editor.schema);
      const fragment = serializer.serializeFragment(slice.content);
      const container = document.createElement("div");
      container.appendChild(fragment);
      setSelectedHtml(container.innerHTML);
    } else {
      setSelectedHtml("");
    }
  };

  const handleAiAction = async (e: React.FormEvent) => {
    e.preventDefault();

    editor.chain().focus().deleteSelection().run();

    const fullPrompt = `Selected HTML:\n${selectedHtml}\n\nInstruction:\n${input}`;
    await complete(fullPrompt);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    if (completion.length < previousLength.current) {
      previousLength.current = 0;
    }
    if (!completion) return;

    const delta = completion.slice(previousLength.current);
    if (!delta) return;

    editor.chain().focus().insertContent(delta).run();

    previousLength.current = completion.length;
  }, [completion, editor]);
  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <MenuButton title="Ask AI Assistant" disabled={isSelectionEmpty}>
          <ArtificialIntelligenceIcon
            className="size-4.5"
            viewBox="0 0 24 24"
          />
        </MenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="max-w-3xl w-screen p-2 focus-within:ring-1 focus-within:ring-secondary-gold focus-within:border-secondary-gold transition-all"
      >
        <form
          className="flex flex-col items-end gap-2 px-2 "
          onSubmit={handleAiAction}
        >
          {isLoading ? (
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-1">
                <p className="text-sm text-muted-foreground animate-pulse ">
                  AI is typing...
                </p>
                <DotLoader />
              </div>
              <MenuButton
                withoutTooltip
                title="Loading..."
                variant="secondary"
                onClick={stop}
              >
                <CircleStop size={18} />
              </MenuButton>
            </div>
          ) : (
            <>
              <textarea
                ref={textareaRef}
                className="py-1.5 w-full text-sm bg-transparent outline-none resize-none max-h-75"
                rows={1}
                placeholder="Ask AI what you want..."
                name="text"
                value={input}
                onChange={handleInputChange}
                autoFocus
              />
              <MenuButton
                withoutTooltip
                disabled={!input || isLoading}
                title="Send"
                variant="secondary"
                type="submit"
              >
                <ArrowUp size={18} />
              </MenuButton>
            </>
          )}
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
