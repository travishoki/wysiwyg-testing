import { capitalizeWord, formatTitle } from "./helpers"

describe("capitalizeWord", () => {
  it("capitalizeWord", () => {
    const str = "one"
    const result = capitalizeWord(str)
    const expectedResult = "One"
    expect(result).toEqual(expectedResult)
  })
})

describe("formatTitle", () => {
  it("formatTitle", () => {
    const str = "one-two-three"
    const result = formatTitle(str)
    const expectedResult = "One Two Three"
    expect(result).toEqual(expectedResult)
  })
})
