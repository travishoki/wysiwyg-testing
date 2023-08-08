import * as React from "react"
import { Suspense, useCallback } from "react"
import "./HokiComponent.css"

import ImageFile from "../images/icons/file-image.svg"
import ImageClose from "../images/icons/close.svg"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getNodeByKey } from "lexical"
import { $isHokiNode } from "./HokiNode"

export default function HokiComponent({ nodeKey }: HokiComponentProps): JSX.Element {
  const [editor] = useLexicalComposerContext()

  const onClickClose = useCallback(() => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey)
      if ($isHokiNode(node)) {
        node.remove()
      }
    })
  }, [editor, nodeKey])

  return (
    <Suspense fallback={null}>
      <div className="hoki-component-inner">
        <div className="hoki-component-content">
          <img alt="icon" className="svg-icon" height="15" src={ImageFile} width="15" />
          <p>Hoki was here!</p>
        </div>

        <button className="button-close" onClick={onClickClose}>
          <img alt="close" className="svg-close" height="15" src={ImageClose} width="15" />
        </button>
      </div>
    </Suspense>
  )
}

type HokiComponentProps = {
  nodeKey: string
}
