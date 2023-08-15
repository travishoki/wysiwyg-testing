import { MenuOption } from "@lexical/react/LexicalTypeaheadMenuPlugin"

export class MentionTypeaheadOption extends MenuOption {
  name: string
  picture: JSX.Element

  constructor(name: string, picture: JSX.Element) {
    super(name)
    this.name = name
    this.picture = picture
  }
}
