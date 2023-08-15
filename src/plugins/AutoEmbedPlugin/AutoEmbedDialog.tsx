import * as React from "react"
import { useMemo, useState } from "react"
import { EmbedMatchResult, URL_MATCHER } from "@lexical/react/LexicalAutoEmbedPlugin"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { Button } from "../../ui/Button"
import { DialogActions } from "../../ui/Dialog"
import { PlaygroundEmbedConfig } from "./PlaygroundEmbedConfig"

const debounce = (callback: (text: string) => void, delay: number) => {
  let timeoutId: number
  return (text: string) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback(text)
    }, delay)
  }
}

type AutoEmbedDialogProps = {
  embedConfig: PlaygroundEmbedConfig
  onClose: () => void
}

export function AutoEmbedDialog({ embedConfig, onClose }: AutoEmbedDialogProps): JSX.Element {
  const [text, setText] = useState("")
  const [editor] = useLexicalComposerContext()
  const [embedResult, setEmbedResult] = useState<EmbedMatchResult | null>(null)

  const validateText = useMemo(
    () =>
      debounce((inputText: string) => {
        const urlMatch = URL_MATCHER.exec(inputText)
        if (embedConfig != null && inputText != null && urlMatch != null) {
          Promise.resolve(embedConfig.parseUrl(inputText)).then((parseResult) => {
            setEmbedResult(parseResult)
          })
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
      <div className="Input__wrapper">
        <input
          type="text"
          className="Input__input"
          placeholder={embedConfig.exampleUrl}
          value={text}
          data-test-id={`${embedConfig.type}-embed-modal-url`}
          onChange={(e) => {
            const { value } = e.target
            setText(value)
            validateText(value)
          }}
        />
      </div>
      <DialogActions>
        <Button
          disabled={!embedResult}
          onClick={onClick}
          data-test-id={`${embedConfig.type}-embed-modal-submit-btn`}
        >
          Embed
        </Button>
      </DialogActions>
    </div>
  )
}