import React, { useState } from "react"
import { Button } from "../../ui/Button/Button"
import { DialogActions } from "../../ui/Dialog/Dialog"
import { TextInput } from "../../ui/TextInput/TextInput"
import { InsertImagePayload } from "./types"

type InsertImageUriDialogBodyProps = {
  onClick: (payload: InsertImagePayload) => void
}

export const InsertImageUriDialogBody = ({ onClick }: InsertImageUriDialogBodyProps) => {
  const [src, setSrc] = useState("")
  const [altText, setAltText] = useState("")

  const isDisabled = src === ""

  return (
    <>
      <TextInput
        data-test-id="image-modal-url-input"
        label="Image URL"
        onChange={setSrc}
        placeholder="i.e. https://source.unsplash.com/random"
        value={src}
      />
      <TextInput
        data-test-id="image-modal-alt-text-input"
        label="Alt Text"
        onChange={setAltText}
        placeholder="Random unsplash image"
        value={altText}
      />
      <DialogActions>
        <Button
          data-test-id="image-modal-confirm-btn"
          disabled={isDisabled}
          onClick={() => onClick({ altText, src })}
        >
          Confirm
        </Button>
      </DialogActions>
    </>
  )
}
