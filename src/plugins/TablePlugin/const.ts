import { createCommand, LexicalCommand } from "lexical"
import { InsertTableCommandPayload } from "./types"

export const INSERT_NEW_TABLE_COMMAND: LexicalCommand<InsertTableCommandPayload> = createCommand(
  "INSERT_NEW_TABLE_COMMAND",
)
