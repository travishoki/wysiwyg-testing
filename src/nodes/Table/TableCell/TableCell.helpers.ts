import { $generateHtmlFromNodes } from "@lexical/html"
import { $getRoot, EditorThemeClasses, LexicalEditor } from "lexical"
import { cellTextContentCache } from "../TableNode"
import { cellHTMLCache } from "../const"

export const createEmptyParagraphHTML = (theme: EditorThemeClasses): string => {
  return `<p class="${theme.paragraph}"><br></p>`
}

export const generateHTMLFromJSON = (
  editorStateJSON: string,
  cellEditor: LexicalEditor,
): string => {
  const editorState = cellEditor.parseEditorState(editorStateJSON)
  let html = cellHTMLCache.get(editorStateJSON)
  if (html === undefined) {
    html = editorState.read(() => $generateHtmlFromNodes(cellEditor, null))
    const textContent = editorState.read(() => $getRoot().getTextContent())
    cellHTMLCache.set(editorStateJSON, html)
    cellTextContentCache.set(editorStateJSON, textContent)
  }

  return html
}
