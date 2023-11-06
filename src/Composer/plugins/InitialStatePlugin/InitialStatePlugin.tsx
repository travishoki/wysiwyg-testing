import { useEffect, useState } from "react"
import { $generateNodesFromDOM } from "@lexical/html"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getRoot } from "lexical"

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

        // Add in all of the nodes
        nodes.forEach((n) => root.append(n))
      })
    }
  }, [editor, hasBeenIntialized, initialState, setHasBeenIntialized])

  return null
}
