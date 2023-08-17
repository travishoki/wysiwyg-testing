import { clamp } from "./helpers"

describe("clamp", () => {
  const min = 5
  const max = 10

  it("should return value", () => {
    const value = 6
    const result = clamp(value, min, max)
    const expectedResult = value
    expect(result).toEqual(expectedResult)
  })

  it("should return min", () => {
    const value = 1
    const result = clamp(value, min, max)
    const expectedResult = min
    expect(result).toEqual(expectedResult)
  })

  it("should return max", () => {
    const value = 11
    const result = clamp(value, min, max)
    const expectedResult = max
    expect(result).toEqual(expectedResult)
  })
})
