import { find } from "lodash"
import { MergeField } from "types"

export const getValidMergeField = (
  mergeFieldKey: ID | string,
  mergeFields: MergeField[],
): MergeField | null => {
  let mergeField = null

  // Try to match on id
  mergeField = find(mergeFields, {
    id: mergeFieldKey,
  })
  if (mergeField) return mergeField

  // Try to match on name
  mergeField = find(mergeFields, {
    name: mergeFieldKey,
  })
  if (mergeField) return mergeField

  return null
}

export const splitAtHandlebars = (str: string) => {
  const regEx = /{{(.*?)}}/g

  return str.split(regEx).filter(Boolean)
}
