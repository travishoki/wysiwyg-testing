import { validateUrl } from "./url"

describe("validateUrl", () => {
  it("should return true", () => {
    const url = "https://spiff.com"
    const result = validateUrl(url)
    const expectedResult = true
    expect(result).toEqual(expectedResult)
  })

  it("should return false", () => {
    const url = "spiff.com"
    const result = validateUrl(url)
    const expectedResult = false
    expect(result).toEqual(expectedResult)
  })
})
