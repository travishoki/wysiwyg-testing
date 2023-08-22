import { LexicalCommand, createCommand } from "lexical"
import { InsertImagePayload } from "./ImagesPlugin.types"

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand("INSERT_IMAGE_COMMAND")
