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
