import { createUID } from "./uid"

describe("createUID", () => {
  const result = createUID()

  it("should return uid", () => {
    expect(result.length > 0).toEqual(true)
    expect(typeof result).toEqual("string")
  })
})
