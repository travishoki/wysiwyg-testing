import { LexicalCommand, createCommand } from "lexical"

export const INSERT_HOKI_COMMAND: LexicalCommand<void> = createCommand("INSERT_HOKI_COMMAND")

export const DELETE_HOKI_COMMAND: LexicalCommand<void> = createCommand("DELETE_HOKI_COMMAND")
