import React, { Suspense, useCallback } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import useLexicalEditable from "@lexical/react/useLexicalEditable"
import { $getNodeByKey } from "lexical"
import { formatMergeFieldTitle } from "../../../helpers/mergeFields.helpers"
import ImageClose from "../../../images/icons/close.svg"
import { ComposerNodeFallback } from "../../../ui/ComposerNodeFallback/ComposerNodeFallback"
import { $isMergeFieldNode } from "../MergeFieldNode"
import styles from "./MergeFieldComponent.module.scss"

const MergeFieldComponent = ({ mergeFieldName, nodeKey }: MergeFieldComponentProps) => {
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
    <Suspense fallback={<ComposerNodeFallback />}>
      <div className={styles["merge-field"]}>
        <div className={styles.inner}>
          <div className={styles.content}>
            <p className={styles.title}>{formatMergeFieldTitle(mergeFieldName)}</p>
          </div>

          {isEditable && (
            <button className={styles.buttonClose} onClick={onClickClose}>
              <img alt="close" height="15" src={ImageClose} width="15" />
            </button>
          )}
        </div>
      </div>
    </Suspense>
  )
}

type MergeFieldComponentProps = {
  mergeFieldName: string
  nodeKey: string
}

// eslint-disable-next-line import/no-default-export -- This component is lazy loaded.
export default MergeFieldComponent
