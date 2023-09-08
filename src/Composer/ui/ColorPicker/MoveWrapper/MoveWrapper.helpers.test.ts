import { clamp } from "./MoveWrapper.helpers"

describe("clamp", () => {
  const min = 1
  const max = 3

  test("should return min number", () => {
    const value = -1
    const result = clamp(value, max, min)
    const exectedResult = min
    expect(result).toEqual(exectedResult)
  })

  test("should return number", () => {
    const value = 2
    const result = clamp(value, max, min)
    const exectedResult = value
    expect(result).toEqual(exectedResult)
  })

  test("should return max number", () => {
    const value = 4
    const result = clamp(value, max, min)
    const exectedResult = max
    expect(result).toEqual(exectedResult)
  })
})
