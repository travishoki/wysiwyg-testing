import React from "react"
import { useState } from "react"
import { Button } from "../../ui/Button/Button"
import { DialogActions } from "../../ui/Dialog/Dialog"
import { FileInput } from "../../ui/FileInput/FileInput"
import { TextInput } from "../../ui/TextInput/TextInput"
import { InsertImagePayload } from "./types"

type InsertImageUploadedDialogBodyProps = {
  onClick: (payload: InsertImagePayload) => void
}

export const InsertImageUploadedDialogBody = ({ onClick }: InsertImageUploadedDialogBodyProps) => {
  const [src, setSrc] = useState("")
  const [altText, setAltText] = useState("")

  const isDisabled = src === ""

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

  return (
    <>
      <FileInput
        accept="image/*"
        data-test-id="image-modal-file-upload"
        label="Image Upload"
        onChange={loadImage}
      />
      <TextInput
        data-test-id="image-modal-alt-text-input"
        label="Alt Text"
        onChange={setAltText}
        placeholder="Descriptive alternative text"
        value={altText}
      />
      <DialogActions>
        <Button
          data-test-id="image-modal-file-upload-btn"
          disabled={isDisabled}
          onClick={() => onClick({ altText, src })}
        >
          Confirm
        </Button>
      </DialogActions>
    </>
  )
}
