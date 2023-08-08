import { LexicalCommand, createCommand } from "lexical"

type InsertMergeFieldCommandPayload = Readonly<{
  mergeFieldIconUrl: string
  mergeFieldKey: string
}>

export const INSERT_MERGE_FIELD_COMMAND: LexicalCommand<InsertMergeFieldCommandPayload> =
  createCommand("INSERT_MERGE_FIELD_COMMAND")
