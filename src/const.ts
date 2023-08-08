import { LexicalCommand, createCommand } from "lexical"

export const INSERT_MERGE_FIELD_COMMAND: LexicalCommand<void> = createCommand(
  "INSERT_MERGE_FIELD_COMMAND",
)
