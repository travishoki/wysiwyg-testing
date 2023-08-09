import * as React from "react"
import { Suspense, useCallback } from "react"

import { $getNodeByKey } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import useLexicalEditable from "@lexical/react/useLexicalEditable"

import ImageClose from "../images/icons/close.svg"
import { $isMergeFieldNode } from "./MergeFieldNode"
import { formatMergeFieldTitle } from "../MergeFieldControls/MergeFieldButton/helpers"
import "./MergeFieldComponent.css"

export default function MergeFieldComponent({
  mergeFieldIconUrl,
  mergeFieldKey,
  nodeKey,
}: MergeFieldComponentProps): JSX.Element {
  const [editor] = useLexicalComposerContext()
  const isEditable = useLexicalEditable()

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
          <img alt="icon" className="svg-icon" height="15" src={mergeFieldIconUrl} width="15" />
          <p>{formatMergeFieldTitle(mergeFieldKey)}</p>
        </div>

        {isEditable && (
          <button className="button-close" onClick={onClickClose}>
            <img alt="close" height="15" src={ImageClose} width="15" />
          </button>
        )}
      </div>
    </Suspense>
  )
}

type MergeFieldComponentProps = {
  mergeFieldIconUrl: string
  mergeFieldKey: string
  nodeKey: string
}
