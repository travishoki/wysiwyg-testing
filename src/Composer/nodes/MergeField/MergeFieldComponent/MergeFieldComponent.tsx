import React, { Suspense, useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection"
import { mergeRegister } from "@lexical/utils"
import classNames from "classnames"
import { $getNodeByKey, COMMAND_PRIORITY_LOW, FORMAT_TEXT_COMMAND } from "lexical"
import { formatMergeFieldTitle } from "../../../helpers/mergeFields.helpers"
import { ComposerNodeFallback } from "../../../ui/ComposerNodeFallback/ComposerNodeFallback"
import styles from "./MergeFieldComponent.module.scss"

const MergeFieldComponent = ({
  className,
  mergeFieldName,
  nodeKey,
  style,
}: MergeFieldComponentProps) => {
  const [editor] = useLexicalComposerContext()
  const [isSelected, _setSelected, _clearSelection] = useLexicalNodeSelection(nodeKey)

  useEffect(() => {
    const unregister = mergeRegister(
      editor.registerCommand(
        FORMAT_TEXT_COMMAND,
        (formatType) => {
          const node = $getNodeByKey(nodeKey)
          if (node && isSelected) {
            node.toggleFormatType(formatType)
          }

          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
    )

    return () => {
      unregister()
    }
  }, [editor, isSelected, nodeKey])

  return (
    <Suspense fallback={<ComposerNodeFallback />}>
      <span className={classNames(styles["merge-field"], className)} style={style}>
        <p className={styles.title}>
          <span>{"{ "}</span>
          {formatMergeFieldTitle(mergeFieldName)}
          <span>{" }"}</span>
        </p>
      </span>
    </Suspense>
  )
}

type MergeFieldComponentProps = {
  className?: string
  mergeFieldName: string
  nodeKey: string
  style: Record<string, string>
}

// eslint-disable-next-line import/no-default-export -- This component is lazy loaded.
export default MergeFieldComponent
