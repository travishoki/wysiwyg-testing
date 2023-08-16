import { $getRoot, LexicalEditor } from "lexical"

export const getTopLevelNodeKeys = (editor: LexicalEditor): string[] => {
  return editor.getEditorState().read(() => $getRoot().getChildrenKeys())
}
