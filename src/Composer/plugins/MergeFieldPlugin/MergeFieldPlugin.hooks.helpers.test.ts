import { MergeField } from "types"
import { getHandlebarsMatch, getIsValidMergeField } from "./MergeFieldPlugin.hooks.helpers"

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

describe("getHandlebarsMatch", () => {
  it("should return true", () => {
    const text = "{{foo}}"
    const result = getHandlebarsMatch(text)
    const expectResults = ["foo"]

    expect(result).toEqual(expectResults)
  })

  it("should return false", () => {
    const text = "{foo}"
    const result = getHandlebarsMatch(text)

    expect(result).toBeNull()
  })
})
