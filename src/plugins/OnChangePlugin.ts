import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";

type OnChangePluginType = {
  onChange: (editorState: EditorState) => void;
};

export function OnChangePlugin({ onChange }: OnChangePluginType): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener((editorState) => {
      onChange(editorState);
    });
  }, [onChange, editor]);

  return null;
}
