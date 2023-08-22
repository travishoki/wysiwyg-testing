import React, { useEffect, useRef, useState } from "react"
import { LexicalEditor } from "lexical"
import { Position } from "../../../nodes/InlineImage/InlineImageNode"
import { Button } from "../../../ui/Button/Button"
import stylesCheckbox from "../../../ui/Checkbox.module.scss"
import { DialogActions } from "../../../ui/Dialog/Dialog"
import { FileInput } from "../../../ui/FileInput/FileInput"
import { InputWrapper } from "../../../ui/Input/InputWrapper/InputWrapper"
import { Select } from "../../../ui/Select/Select"
import { TextInput } from "../../../ui/TextInput/TextInput"
import { INSERT_INLINE_IMAGE_COMMAND } from "../InlineImagePlugin.const"

type InsertInlineImageDialogProps = {
  activeEditor: LexicalEditor
  onClose: () => void
}

export const InsertInlineImageDialog = ({
  activeEditor,
  onClose,
}: InsertInlineImageDialogProps) => {
  const hasModifier = useRef(false)

  const [src, setSrc] = useState("")
  const [altText, setAltText] = useState("")
  const [showCaption, setShowCaption] = useState(false)
  const [position, setPosition] = useState<Position>("left")

  const isDisabled = src === ""

  const handleShowCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowCaption(e.target.checked)
  }

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPosition(e.target.value as Position)
  }

  const loadImage = (files: FileList | null) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSrc(reader.result)
      }

      return ""
    }

    if (files !== null) {
      reader.readAsDataURL(files[0])
    }
  }

  useEffect(() => {
    hasModifier.current = false
    const handler = (e: KeyboardEvent) => {
      hasModifier.current = e.altKey
    }
    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [activeEditor])

  const handleOnClick = () => {
    const payload = { altText, position, showCaption, src }
    activeEditor.dispatchCommand(INSERT_INLINE_IMAGE_COMMAND, payload)
    onClose()
  }

  return (
    <>
      <div style={{ marginBottom: "1em" }}>
        <FileInput
          accept="image/*"
          data-test-id="image-modal-file-upload"
          label="Image Upload"
          onChange={loadImage}
        />
      </div>
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
        style={{ marginBottom: "1em", width: "290px" }}
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
        <Button
          data-test-id="image-modal-file-upload-btn"
          disabled={isDisabled}
          onClick={() => handleOnClick()}
        >
          Confirm
        </Button>
      </DialogActions>
    </>
  )
}
