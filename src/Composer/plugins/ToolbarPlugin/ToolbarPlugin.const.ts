import { createCommand, LexicalCommand } from "lexical"

export const blockTypeToBlockName = {
  bullet: "Bulleted List",
  check: "Check List",
  custom: "Custom",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Paragraph",
  quote: "Quote",
}

export const TOOLBAR_FORMAT_PARAGRAPH_COMMAND: LexicalCommand<null> = createCommand()
export const TOOLBAR_UPDATE_SIZE_COMMAND: LexicalCommand<string> = createCommand()
