import { isSelectAll } from "./SelectAllPlugin.helpers"

describe("isSelectAll", () => {
  it("should return true", () => {
    const keyCode = 65
    const metaKey = true
    const ctrlKey = true
    const result = isSelectAll(keyCode, metaKey, ctrlKey)
    expect(result).toBe(true)
  })

  it("should return false, if not the correct key", () => {
    const keyCode = 123
    const metaKey = true
    const ctrlKey = true
    const result = isSelectAll(keyCode, metaKey, ctrlKey)
    expect(result).toBe(false)
  })
})

it("should return false, if not the correct control/meta key", () => {
  const keyCode = 65
  const metaKey = false
  const ctrlKey = false
  const result = isSelectAll(keyCode, metaKey, ctrlKey)
  expect(result).toBe(false)
})
