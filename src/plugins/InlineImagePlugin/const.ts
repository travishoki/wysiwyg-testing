import { createCommand, LexicalCommand } from "lexical"
import { InlineImagePayload } from "../../nodes/InlineImageNode"

export const INSERT_INLINE_IMAGE_COMMAND: LexicalCommand<InlineImagePayload> = createCommand(
  "INSERT_INLINE_IMAGE_COMMAND",
)
