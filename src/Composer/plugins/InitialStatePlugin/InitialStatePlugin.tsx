import { useEffect, useState } from "react"
import { $generateNodesFromDOM } from "@lexical/html"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createParagraphNode, $getRoot, $isParagraphNode } from "lexical"

type InitialStatePluginProps = {
  initialState: string
}

export function InitialStatePlugin({ initialState }: InitialStatePluginProps): JSX.Element | null {
  const [editor] = useLexicalComposerContext()
  const [hasBeenIntialized, setHasBeenIntialized] = useState(false)

  useEffect(() => {
    // Only needs to initialize once
    if (!hasBeenIntialized) {
      setHasBeenIntialized(true)

      editor.update(() => {
        const root = $getRoot()
        const parser = new DOMParser()
        const dom = parser.parseFromString(initialState, "text/html")
        const nodes = $generateNodesFromDOM(editor, dom)

        // Clear everything
        root.clear()

        if (nodes.length === 1 && $isParagraphNode(nodes[0])) {
          // Add in the node
          root.append(nodes[0])
        } else {
          const paragraphNode = $createParagraphNode()

          // Add in all of the nodes
          nodes.forEach((n) => paragraphNode.append(n))

          root.append(paragraphNode)
        }
      })
    }
  }, [editor, hasBeenIntialized, initialState, setHasBeenIntialized])

  return null
}
