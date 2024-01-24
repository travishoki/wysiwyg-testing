import { MergeField } from "types"
import { filterMergeFields, doesStringContain } from "./helpers"

describe("doesStringContain", () => {
  const str = "abc"

  it("should return true", () => {
    const searchTerm = "ab"
    const result = doesStringContain(str, searchTerm)
    expect(result).toBe(true)
  })

  it("should return true, even with casing", () => {
    const searchTerm = "AbC"
    const result = doesStringContain(str, searchTerm)
    expect(result).toBe(true)
  })

  it("should return false", () => {
    const searchTerm = "d"
    const result = doesStringContain(str, searchTerm)
    expect(result).toBe(false)
  })
})

const mockMergeField = (props: Partial<MergeField>): MergeField => ({
  __typename: "MergeField",
  id: "111",
  name: "foo",
  updatedAt: new Date().toString(),
  ...props,
})

describe("filterMergeFields", () => {
  const mergeField1: MergeField = mockMergeField({
    id: "111",
    name: "a",
  })
  const mergeField2: MergeField = mockMergeField({
    id: "333",
    name: "ba",
  })
  const mergeFields = [mergeField1, mergeField2]

  it("should contain the substring", () => {
    const searchTerm = "ba"
    const result = filterMergeFields(mergeFields, searchTerm)
    const expectedResults = [mergeField2]
    expect(result).toEqual(expectedResults)
  })

  it("should return an empty array, if there are no matching strings", () => {
    const searchTerm = "aa"
    const result = filterMergeFields(mergeFields, searchTerm)
    const expectedResults: MergeField[] = []
    expect(result).toEqual(expectedResults)
  })

  it("should return the original array, if a search term is not provided", () => {
    const searchTerm: string = undefined
    const result = filterMergeFields(mergeFields, searchTerm)
    const expectedResults = mergeFields
    expect(result).toEqual(expectedResults)
  })
})
