import { $isParagraphNode, LexicalNode } from "lexical"

export const filterOutEmptyPargraphNodes = (node: LexicalNode) => {
  const isEmptyParagraphNode = $isParagraphNode(node) && node.getTextContent() === ""

  return !isEmptyParagraphNode
}
