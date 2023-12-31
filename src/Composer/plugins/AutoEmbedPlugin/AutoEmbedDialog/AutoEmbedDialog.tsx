import React, { useMemo, useState } from "react"
import { EmbedMatchResult, URL_MATCHER } from "@lexical/react/LexicalAutoEmbedPlugin"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { noop } from "lodash"
import { Button } from "../../../ui/Button/Button"
import { DialogActions } from "../../../ui/Dialog/Dialog"
import { InputInput } from "../../../ui/Input/InputInput"
import { InputWrapper } from "../../../ui/Input/InputWrapper/InputWrapper"
import { ComposerEmbedConfig } from "../ComposerEmbedConfig"
import { debounce } from "./AutoEmbedDialog.helpers"

type AutoEmbedDialogProps = {
  embedConfig: ComposerEmbedConfig
  onClose: () => void
}

export const AutoEmbedDialog = ({ embedConfig, onClose }: AutoEmbedDialogProps) => {
  const [text, setText] = useState("")
  const [editor] = useLexicalComposerContext()
  const [embedResult, setEmbedResult] = useState<EmbedMatchResult | null>(null)

  const validateText = useMemo(
    () =>
      debounce((inputText: string) => {
        const urlMatch = URL_MATCHER.exec(inputText)
        if (embedConfig != null && inputText != null && urlMatch != null) {
          Promise.resolve(embedConfig.parseUrl(inputText))
            .then((parseResult) => {
              setEmbedResult(parseResult)
            })
            .catch(noop)
        } else if (embedResult != null) {
          setEmbedResult(null)
        }
      }, 200),
    [embedConfig, embedResult],
  )

  const onClick = () => {
    if (embedResult != null) {
      embedConfig.insertNode(editor, embedResult)
      onClose()
    }
  }

  return (
    <div style={{ width: "600px" }}>
      <InputWrapper>
        <InputInput
          aria-label="text"
          data-test-id={`${embedConfig.type}-embed-modal-url`}
          onChange={(e) => {
            const { value } = e.target
            setText(value)
            validateText(value)
          }}
          placeholder={embedConfig.exampleUrl}
          type="text"
          value={text}
        />
      </InputWrapper>
      <DialogActions>
        <Button
          data-test-id={`${embedConfig.type}-embed-modal-submit-btn`}
          disabled={!embedResult}
          onClick={onClick}
        >
          Embed
        </Button>
      </DialogActions>
    </div>
  )
}
