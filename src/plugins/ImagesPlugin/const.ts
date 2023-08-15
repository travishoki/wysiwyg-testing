import { createCommand, LexicalCommand } from "lexical"
import { InsertImagePayload } from "./types"

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand("INSERT_IMAGE_COMMAND")
