import { find } from "lodash"
import { MergeField } from "types"

export const getIsValidMergeField = (
  mergeFieldName: string,
  mergeFields: MergeField[],
): boolean => {
  return !!find(mergeFields, {
    name: mergeFieldName,
  })
}

const regex = /(?<=\{\{).*?(?=\}\})/g

export const getHandlebarsMatch = (text: string) => {
  return text.match(regex)
}
