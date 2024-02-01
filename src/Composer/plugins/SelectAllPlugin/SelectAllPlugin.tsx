import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { COMMAND_PRIORITY_LOW, KEY_DOWN_COMMAND } from "lexical"
import { $selectAll, isSelectAll } from "./SelectAllPlugin.helpers"

export const SelectAllPlugin = (): null => {
  const [editor] = useLexicalComposerContext()

  editor.registerCommand<KeyboardEvent>(
    KEY_DOWN_COMMAND,
    (event) => {
      const { ctrlKey, keyCode, metaKey } = event

      if (isSelectAll(keyCode, metaKey, ctrlKey)) {
        event.preventDefault()
        editor.update(() => {
          $selectAll(editor)
        })

        return true
      }

      return false
    },
    COMMAND_PRIORITY_LOW,
  )

  return null
}
