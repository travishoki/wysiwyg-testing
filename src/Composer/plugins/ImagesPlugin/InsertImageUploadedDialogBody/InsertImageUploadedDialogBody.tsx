import React, { useState } from "react"
import { useTranslation } from "src/i18n"
import { Button } from "../../../ui/Button/Button"
import { DialogActions } from "../../../ui/Dialog/Dialog"
import { FileInput } from "../../../ui/FileInput/FileInput"
import { TextInput } from "../../../ui/TextInput/TextInput"
import { InsertImagePayload } from "../ImagesPlugin.types"

type InsertImageUploadedDialogBodyProps = {
  onClick: (payload: InsertImagePayload) => void
}

export const InsertImageUploadedDialogBody = ({ onClick }: InsertImageUploadedDialogBodyProps) => {
  const [src, setSrc] = useState("")
  const [altText, setAltText] = useState("")
  const { t } = useTranslation("scenes", { keyPrefix: "composer" })
  const { t: tCommon } = useTranslation("common")

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
        label={t("Image Upload")}
        onChange={loadImage}
      />
      <TextInput
        data-test-id="image-modal-alt-text-input"
        label={t("Alt Text")}
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
          {tCommon("Confirm")}
        </Button>
      </DialogActions>
    </>
  )
}
