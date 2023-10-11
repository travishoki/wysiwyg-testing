import { $createParagraphNode, TextNode } from "lexical"
import { $createMergeFieldNode } from "../../nodes/MergeField/MergeFieldNode"

const regex = /(?<=\{\{).*?(?=\}\})/g

export const textNodeTransform = (node: TextNode): void => {
  const text = node.getTextContent()
  const handlebarsMatch = text.match(regex)

  const hasHandlebars = !!handlebarsMatch

  if (hasHandlebars) {
    handlebarsMatch.forEach((mergeField) => {
      const mergeFieldNode = $createMergeFieldNode(mergeField)

      const nodes = $createParagraphNode()

      text.split(`{{${mergeField}}}`).forEach((str, index) => {
        if (index !== 0) {
          nodes.append(mergeFieldNode)
        }

        nodes.append(new TextNode(str))
      })

      node.replace(nodes)
    })
  }
}
