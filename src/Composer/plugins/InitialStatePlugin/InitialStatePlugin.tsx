import { useEffect } from "react"
import { $generateNodesFromDOM } from "@lexical/html"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $createParagraphNode, $getRoot } from "lexical"

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
      const paragraphNode = $createParagraphNode()

      // Add in all of the nodes
      nodes.forEach((n) => paragraphNode.append(n))

      // Clear everything and populate with nodes
      root.clear()
      root.append(paragraphNode)
      root.getFirstDescendant()?.remove()
    })
  }, [editor, initialState])

  return null
}
