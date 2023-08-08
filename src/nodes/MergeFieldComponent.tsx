import * as React from "react"
import { Suspense, useCallback } from "react"
import "./MergeFieldComponent.css"

import ImageFile from "../images/icons/file-image.svg"
import ImageClose from "../images/icons/close.svg"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getNodeByKey } from "lexical"
import { $isMergeFieldNode } from "./MergeFieldNode"

export default function MergeFieldComponent({ nodeKey }: MergeFieldComponentProps): JSX.Element {
  const [editor] = useLexicalComposerContext()

  const onClickClose = useCallback(() => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey)
      if ($isMergeFieldNode(node)) {
        node.remove()
      }
    })
  }, [editor, nodeKey])

  return (
    <Suspense fallback={null}>
      <div className="merge-field-component-inner">
        <div className="merge-field-component-content">
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

type MergeFieldComponentProps = {
  nodeKey: string
}
