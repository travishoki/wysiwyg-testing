import { capitalizeWord, formatMergeFieldTitle } from "./mergeFields.helpers"

describe("capitalizeWord", () => {
  it("should return capitalized word", () => {
    const str = "one"
    const result = capitalizeWord(str)
    const expectedResult = "One"
    expect(result).toEqual(expectedResult)
  })
})

describe("formatMergeFieldTitle", () => {
  it("should return a formatted string", () => {
    const str = "one_two-Three FOUR"
    const result = formatMergeFieldTitle(str)
    const expectedResult = "One Two Three Four"
    expect(result).toEqual(expectedResult)
  })

  it("should return an empty string", () => {
    const str: Maybe<string> = null
    const result = formatMergeFieldTitle(str)
    const expectedResult = ""
    expect(result).toEqual(expectedResult)
  })
})
