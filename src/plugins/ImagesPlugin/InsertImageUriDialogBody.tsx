import * as React from "react"
import { useState } from "react"
import { Button } from "../../ui/Button"
import { DialogActions } from "../../ui/Dialog"
import { TextInput } from "../../ui/TextInput"
import { InsertImagePayload } from "./types"

type InsertImageUriDialogBodyProps = {
  onClick: (payload: InsertImagePayload) => void
}

export function InsertImageUriDialogBody({ onClick }: InsertImageUriDialogBodyProps) {
  const [src, setSrc] = useState("")
  const [altText, setAltText] = useState("")

  const isDisabled = src === ""

  return (
    <>
      <TextInput
        label="Image URL"
        placeholder="i.e. https://source.unsplash.com/random"
        onChange={setSrc}
        value={src}
        data-test-id="image-modal-url-input"
      />
      <TextInput
        label="Alt Text"
        placeholder="Random unsplash image"
        onChange={setAltText}
        value={altText}
        data-test-id="image-modal-alt-text-input"
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
