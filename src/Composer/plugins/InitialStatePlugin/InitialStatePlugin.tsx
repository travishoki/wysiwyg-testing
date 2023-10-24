import { useEffect } from "react"
import { $generateNodesFromDOM } from "@lexical/html"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createParagraphNode, $getRoot, $isParagraphNode } from "lexical"

type InitialStatePluginProps = {
  initialState: string
}

export function InitialStatePlugin({ initialState }: InitialStatePluginProps): JSX.Element | null {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.update(() => {
      const root = $getRoot()
      const parser = new DOMParser()
      const dom = parser.parseFromString(initialState, "text/html")
      const nodes = $generateNodesFromDOM(editor, dom)

      // Clear everything and populate with nodes
      root.clear()

      // Add in all of the nodes
      const filteredNodes = nodes.filter((n) => {
        const isEmptyParagraphNode = $isParagraphNode(n) && n.getTextContent() === ""

        return !isEmptyParagraphNode
      })

      if (filteredNodes.length === 1 && $isParagraphNode(filteredNodes[0])) {
        // Add in the node
        root.append(filteredNodes[0])
      } else {
        const paragraphNode = $createParagraphNode()

        filteredNodes.forEach((n) => paragraphNode.append(n))

        root.append(paragraphNode)
      }
    })
  }, [editor, initialState])

  return null
}
