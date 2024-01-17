import { MergeField } from "types"

export const doesStringBeginWith = (str: string, searchTerm: string) => {
  const length = searchTerm.length

  return str.substring(0, length).toLowerCase() === searchTerm.toLowerCase()
}

export const filterMergeFields = (mergeFields: MergeField[], searchTerm: Maybe<string>) => {
  if (!searchTerm) return mergeFields

  return mergeFields.filter((mergeField) => {
    return doesStringBeginWith(mergeField.name!, searchTerm)
  })
}
