import React, { useState } from "react"
import { useTranslation } from "src/i18n"
import { Button } from "../../../ui/Button/Button"
import { DialogActions } from "../../../ui/Dialog/Dialog"
import { TextInput } from "../../../ui/TextInput/TextInput"
import { InsertImagePayload } from "../ImagesPlugin.types"

type InsertImageUriDialogBodyProps = {
  onClick: (payload: InsertImagePayload) => void
}

export const InsertImageUriDialogBody = ({ onClick }: InsertImageUriDialogBodyProps) => {
  const [src, setSrc] = useState("")
  const [altText, setAltText] = useState("")
  const { t } = useTranslation("scenes", { keyPrefix: "composer" })
  const { t: tCommon } = useTranslation("common")

  const isDisabled = src === ""

  return (
    <>
      <TextInput
        data-test-id="image-modal-url-input"
        label={t("Image URL")}
        onChange={setSrc}
        placeholder="i.e. https://source.unsplash.com/random"
        value={src}
      />
      <TextInput
        data-test-id="image-modal-alt-text-input"
        label={t("Alt Text")}
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
          {tCommon("Confirm")}
        </Button>
      </DialogActions>
    </>
  )
}
