import { find } from "lodash"
import { MergeField } from "types"

export const getValidMergeField = (
  mergeFieldKey: ID | string,
  mergeFields: MergeField[],
): MergeField | null => {
  // Try to match on id
  const matchedId = find(mergeFields, {
    id: mergeFieldKey,
  })
  if (!!matchedId) return matchedId

  // Try to match on name
  const matchedName = find(mergeFields, {
    name: mergeFieldKey,
  })
  if (!!matchedName) return matchedName

  return null
}

export const splitAtHandlebars = (str: string) => {
  const regEx = /{{(.*?)}}/g

  return str.split(regEx).filter(Boolean)
}
