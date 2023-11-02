import { MergeField } from "types"
import { getIsValidMergeField, splitAtHandlebars } from "./InitialStateMergeFieldPlugin.helpers"

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

describe("splitAtHandlebars", () => {
  it("should split string with text around handlebars", () => {
    const text = "a{{foo}}b{{foo}}"
    const result = splitAtHandlebars(text)
    const expectResults = ["a", "foo", "b", "foo"]

    expect(result).toEqual(expectResults)
  })
})
