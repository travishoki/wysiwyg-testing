import { MergeField } from "types"
import { getIsValidMergeField } from "./MergeFieldPlugin.helpers"

describe("getIsValidMergeField", () => {
  const mergeFields: MergeField[] = [
    {
      __typename: "MergeField",
      id: "123",
      name: "foo",
      updatedAt: String(new Date()),
    },
  ]

  it("should return true", () => {
    const mergeFieldName = "foo"
    const result = getIsValidMergeField(mergeFieldName, mergeFields)

    expect(result).toBe(true)
  })

  it("should return false", () => {
    const mergeFieldName = "bar"
    const result = getIsValidMergeField(mergeFieldName, mergeFields)

    expect(result).toBe(false)
  })
})
