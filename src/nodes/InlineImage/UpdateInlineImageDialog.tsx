import * as React from "react"
import { useState } from "react"
import { $getNodeByKey } from "lexical"
import { Button } from "../../ui/Button/Button"
import { DialogActions } from "../../ui/Dialog/Dialog"
import { Select } from "../../ui/Select/Select"
import { TextInput } from "../../ui/TextInput/TextInput"
import { InlineImageNode } from "./InlineImageNode"
import type { Position } from "./InlineImageNode"
import type { LexicalEditor, NodeKey } from "lexical"

type UpdateInlineImageDialogProps = {
  activeEditor: LexicalEditor
  nodeKey: NodeKey
  onClose: () => void
}

export const UpdateInlineImageDialog = ({
  activeEditor,
  nodeKey,
  onClose,
}: UpdateInlineImageDialogProps) => {
  const editorState = activeEditor.getEditorState()
  const node = editorState.read(() => $getNodeByKey(nodeKey) as InlineImageNode)
  const [altText, setAltText] = useState(node.getAltText())
  const [showCaption, setShowCaption] = useState(node.getShowCaption())
  const [position, setPosition] = useState<Position>(node.getPosition())

  const handleShowCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowCaption(e.target.checked)
  }

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPosition(e.target.value as Position)
  }

  const handleOnConfirm = () => {
    const payload = { altText, position, showCaption }
    if (node) {
      activeEditor.update(() => {
        node.update(payload)
      })
    }
    onClose()
  }

  return (
    <>
      <div style={{ marginBottom: "1em" }}>
        <TextInput
          label="Alt Text"
          placeholder="Descriptive alternative text"
          onChange={setAltText}
          value={altText}
          data-test-id="image-modal-alt-text-input"
        />
      </div>

      <Select
        style={{ marginBottom: "1em", width: "208px" }}
        value={position}
        label="Position"
        name="position"
        id="position-select"
        onChange={handlePositionChange}
      >
        <option value="left">Left</option>
        <option value="right">Right</option>
        <option value="full">Full Width</option>
      </Select>

      <div className="Input__wrapper">
        <input
          aria-label="caption"
          id="caption"
          type="checkbox"
          checked={showCaption}
          onChange={handleShowCaptionChange}
        />
        <label htmlFor="caption">Show Caption</label>
      </div>

      <DialogActions>
        <Button data-test-id="image-modal-file-upload-btn" onClick={() => handleOnConfirm()}>
          Confirm
        </Button>
      </DialogActions>
    </>
  )
}
