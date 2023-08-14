import { LexicalCommand, createCommand } from "lexical"

type InsertMergeFieldCommandPayload = Readonly<{
  mergeFieldIconUrl: string
  mergeFieldId: string
}>

export const INSERT_MERGE_FIELD_COMMAND: LexicalCommand<InsertMergeFieldCommandPayload> =
  createCommand("INSERT_MERGE_FIELD_COMMAND")
