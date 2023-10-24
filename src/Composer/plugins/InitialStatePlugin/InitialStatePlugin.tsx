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

      if (nodes.length === 1 && nodes[0].__type === "paragraph") {
        // Add in the node
        root.append(nodes[0])
      } else {
        const paragraphNode = $createParagraphNode()

        // Add in all of the nodes
        nodes.forEach((n) => {
          const isEmptyParagraphNode = $isParagraphNode(n) && n.getTextContent() === ""

          if (!isEmptyParagraphNode) {
            return paragraphNode.append(n)
          }
        })

        root.append(paragraphNode)
      }
    })
  }, [editor, initialState])

  return null
}
