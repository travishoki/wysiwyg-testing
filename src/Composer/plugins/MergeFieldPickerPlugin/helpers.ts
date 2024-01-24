import { MergeField } from "types"

export const doesStringContain = (str: string, searchTerm: string) => {
  return str.toLowerCase().includes(searchTerm.toLowerCase())
}

export const filterMergeFields = (mergeFields: MergeField[], searchTerm: Maybe<string>) => {
  if (!searchTerm) return mergeFields

  return mergeFields.filter((mergeField) => {
    return doesStringContain(mergeField.name!, searchTerm)
  })
}
