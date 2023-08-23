import React, { Suspense, useCallback } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import useLexicalEditable from "@lexical/react/useLexicalEditable"
import { $getNodeByKey } from "lexical"
import { formatMergeFieldTitle } from "../../../../MergeFieldControls/MergeFieldButton/MergeFieldButton.helpers"
import { ComposerNodeFallback } from "../../../ComposerNodeFallback/ComposerNodeFallback"
import ImageClose from "../../../images/icons/close.svg"
import { $isMergeFieldNode } from "../MergeFieldNode"
import styles from "./MergeFieldComponent.module.scss"

const MergeFieldComponent = ({
  mergeFieldIconUrl,
  mergeFieldId,
  nodeKey,
}: MergeFieldComponentProps) => {
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
            <img
              alt="icon"
              className={styles.svgIcon}
              height="15"
              src={mergeFieldIconUrl}
              width="15"
            />
            <p className={styles.title}>{formatMergeFieldTitle(mergeFieldId)}</p>
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
  mergeFieldIconUrl: string
  mergeFieldId: string
  nodeKey: string
}

// eslint-disable-next-line import/no-default-export -- This component is lazy loaded.
export default MergeFieldComponent
