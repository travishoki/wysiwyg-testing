import { $getRoot, LexicalEditor } from "lexical"

export const getTopLevelNodeKeys = (editor: LexicalEditor): string[] => {
  return editor.getEditorState().read(() => $getRoot().getChildrenKeys())
}

export const getCollapsedMargins = (
  elem: HTMLElement,
): {
  marginTop: number
  marginBottom: number
} => {
  const getMargin = (element: Element | null, margin: "marginTop" | "marginBottom"): number =>
    element ? parseFloat(window.getComputedStyle(element)[margin]) : 0

  const { marginTop, marginBottom } = window.getComputedStyle(elem)
  const prevElemSiblingMarginBottom = getMargin(elem.previousElementSibling, "marginBottom")
  const nextElemSiblingMarginTop = getMargin(elem.nextElementSibling, "marginTop")
  const collapsedTopMargin = Math.max(parseFloat(marginTop), prevElemSiblingMarginBottom)
  const collapsedBottomMargin = Math.max(parseFloat(marginBottom), nextElemSiblingMarginTop)

  return { marginBottom: collapsedBottomMargin, marginTop: collapsedTopMargin }
}
