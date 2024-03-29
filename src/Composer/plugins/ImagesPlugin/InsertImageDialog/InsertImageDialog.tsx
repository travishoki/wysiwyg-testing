import React, { useEffect, useRef, useState } from "react"
import { LexicalEditor } from "lexical"
import { useTranslation } from "src/i18n"
import landscapeImage from "../../../images/landscape.jpg"
import yellowFlowerImage from "../../../images/yellow-flower.jpg"
import { Button } from "../../../ui/Button/Button"
import { DialogButtonsList } from "../../../ui/Dialog/DialogButtonsList/DialogButtonsList"
import { INSERT_IMAGE_COMMAND } from "../ImagesPlugin.const"
import { InsertImagePayload } from "../ImagesPlugin.types"
import { InsertImageUploadedDialogBody } from "../InsertImageUploadedDialogBody/InsertImageUploadedDialogBody"
import { InsertImageUriDialogBody } from "../InsertImageUriDialogBody/InsertImageUriDialogBody"

type InsertImageDialogProps = {
  activeEditor: LexicalEditor
  onClose: () => void
}

export const InsertImageDialog = ({ activeEditor, onClose }: InsertImageDialogProps) => {
  const { t } = useTranslation("scenes", { keyPrefix: "composer" })
  const [mode, setMode] = useState<null | "url" | "file">(null)
  const hasModifier = useRef(false)

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

  const onClick = (payload: InsertImagePayload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload)
    onClose()
  }

  return (
    <>
      {!mode && (
        <DialogButtonsList>
          <Button
            data-test-id="image-modal-option-sample"
            onClick={() =>
              onClick(
                hasModifier.current
                  ? {
                      altText: "Daylight fir trees forest glacier green high ice landscape",
                      src: landscapeImage,
                    }
                  : {
                      altText: "Yellow flower in tilt shift lens",
                      src: yellowFlowerImage,
                    },
              )
            }
          >
            Sample
          </Button>
          <Button data-test-id="image-modal-option-url" onClick={() => setMode("url")}>
            {t("URL")}
          </Button>
          <Button data-test-id="image-modal-option-file" onClick={() => setMode("file")}>
            {t("File")}
          </Button>
        </DialogButtonsList>
      )}
      {mode === "url" && <InsertImageUriDialogBody onClick={onClick} />}
      {mode === "file" && <InsertImageUploadedDialogBody onClick={onClick} />}
    </>
  )
}
