import { MenuOption } from "@lexical/react/LexicalTypeaheadMenuPlugin"

export class EmojiOption extends MenuOption {
  title: string

  emoji: string

  keywords: Array<string>

  constructor(
    title: string,
    emoji: string,
    options: {
      keywords?: Array<string>
    },
  ) {
    super(title)
    this.title = title
    this.emoji = emoji
    this.keywords = options.keywords || []
  }
}
