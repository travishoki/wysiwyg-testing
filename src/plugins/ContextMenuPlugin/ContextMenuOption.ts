import { MenuOption } from "@lexical/react/LexicalContextMenuPlugin"
import type { LexicalNode } from "lexical"

export class ContextMenuOption extends MenuOption {
  title: string
  onSelect: (targetNode: LexicalNode | null) => void
  constructor(
    title: string,
    options: {
      onSelect: (targetNode: LexicalNode | null) => void
    },
  ) {
    super(title)
    this.title = title
    this.onSelect = options.onSelect.bind(this)
  }
}
