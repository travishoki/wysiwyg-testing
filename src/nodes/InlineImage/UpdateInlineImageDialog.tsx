import React, { useState } from "react"
import { $getNodeByKey, LexicalEditor, NodeKey } from "lexical"
import { Button } from "../../ui/Button/Button"
import stylesCheckbox from "../../ui/Checkbox.module.scss"
import { DialogActions } from "../../ui/Dialog/Dialog"
import { InputWrapper } from "../../ui/Input/InputWrapper"
import { Select } from "../../ui/Select/Select"
import { TextInput } from "../../ui/TextInput/TextInput"
import { InlineImageNode, Position } from "./InlineImageNode"

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
          data-test-id="image-modal-alt-text-input"
          label="Alt Text"
          onChange={setAltText}
          placeholder="Descriptive alternative text"
          value={altText}
        />
      </div>

      <Select
        id="position-select"
        label="Position"
        name="position"
        onChange={handlePositionChange}
        style={{ marginBottom: "1em", width: "208px" }}
        value={position}
      >
        <option value="left">Left</option>
        <option value="right">Right</option>
        <option value="full">Full Width</option>
      </Select>

      <InputWrapper>
        <input
          aria-label="caption"
          checked={showCaption}
          className={stylesCheckbox.checkbox}
          id="caption"
          onChange={handleShowCaptionChange}
          type="checkbox"
        />
        <label htmlFor="caption">Show Caption</label>
      </InputWrapper>

      <DialogActions>
        <Button data-test-id="image-modal-file-upload-btn" onClick={() => handleOnConfirm()}>
          Confirm
        </Button>
      </DialogActions>
    </>
  )
}
