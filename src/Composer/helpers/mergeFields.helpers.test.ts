import { capitalizeWord, formatMergeFieldTitle } from "./mergeFields.helpers"

describe("capitalizeWord", () => {
  it("capitalizeWord", () => {
    const str = "one"
    const result = capitalizeWord(str)
    const expectedResult = "One"
    expect(result).toEqual(expectedResult)
  })
})

describe("formatMergeFieldTitle", () => {
  it("formatMergeFieldTitle", () => {
    const str = "one-two-three"
    const result = formatMergeFieldTitle(str)
    const expectedResult = "One Two Three"
    expect(result).toEqual(expectedResult)
  })
})
