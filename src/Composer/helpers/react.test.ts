import { Rect } from "./rect"

describe("point", () => {
  const left = 0
  const top = 0
  const right = 10
  const bottom = 10
  const rect = new Rect(left, top, right, bottom)

  it("should return initial values", () => {
    expect(rect.left).toEqual(left)
    expect(rect.top).toEqual(top)
    expect(rect.right).toEqual(right)
    expect(rect.bottom).toEqual(bottom)
  })

  it("should return true for an equal comparison of rects", () => {
    const rect2 = new Rect(left, top, right, bottom)
    expect(rect.equals(rect2)).toBe(true)
  })

  it("should return false for an inequal comparison of rects", () => {
    const rect2 = new Rect(left, top, right, bottom + 1)
    expect(rect.equals(rect2)).toBe(false)
  })
})
