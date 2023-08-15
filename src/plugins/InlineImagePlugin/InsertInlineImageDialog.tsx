import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { LexicalEditor } from "lexical"
import { Button } from "../../ui/Button"
import { DialogActions } from "../../ui/Dialog/Dialog"
import { FileInput } from "../../ui/FileInput"
import { Select } from "../../ui/Select"
import { TextInput } from "../../ui/TextInput"
import { INSERT_INLINE_IMAGE_COMMAND } from "./const"
import type { Position } from "../../nodes/InlineImageNode"

type InsertInlineImageDialogProps = {
  activeEditor: LexicalEditor
  onClose: () => void
}

export function InsertInlineImageDialog({
  activeEditor,
  onClose,
}: InsertInlineImageDialogProps): JSX.Element {
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
    reader.onload = function () {
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
          label="Image Upload"
          onChange={loadImage}
          accept="image/*"
          data-test-id="image-modal-file-upload"
        />
      </div>
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
        style={{ marginBottom: "1em", width: "290px" }}
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
          id="caption"
          type="checkbox"
          checked={showCaption}
          onChange={handleShowCaptionChange}
        />
        <label htmlFor="caption">Show Caption</label>
      </div>

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