import { MergeField } from "types"
import { getHasHandlebars, getValidMergeField, splitAtHandlebars } from "./helpers"

describe("getValidMergeField", () => {
  const mergeField: MergeField = {
    __typename: "MergeField",
    id: "123",
    name: "foo",
    updatedAt: String(new Date()),
  }

  const mergeFields: MergeField[] = [mergeField]

  it("should return true, matching on id", () => {
    const mergeFieldId = "123"
    const result = getValidMergeField(mergeFieldId, mergeFields)

    expect(result).toEqual(mergeField)
  })

  it("should return true, matching on name", () => {
    const mergeFieldName = "foo"
    const result = getValidMergeField(mergeFieldName, mergeFields)

    expect(result).toBe(mergeField)
  })

  it("should return false", () => {
    const mergeFieldName = "bar"
    const result = getValidMergeField(mergeFieldName, mergeFields)

    expect(result).toBe(null)
  })
})

describe("getHasHandlebars", () => {
  it("should return true", () => {
    const text = "a{{foo}}b"
    const result = getHasHandlebars(text)

    expect(result).toBe(true)
  })

  it("should return false", () => {
    const text = "a{foo}b"
    const result = getHasHandlebars(text)

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
