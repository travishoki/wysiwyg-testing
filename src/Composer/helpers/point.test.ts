import { Point, isPoint } from "./point"

describe("point", () => {
  const initX = 0
  const initY = 0
  const point = new Point(initX, initY)

  it("check initial values", () => {
    expect(point.x).toEqual(initX)
    expect(point.y).toEqual(initY)
  })

  it("equals, true", () => {
    const newPoint = new Point(0, 0)
    const result = point.equals(newPoint)
    expect(result).toBe(true)
  })

  it("equals, false", () => {
    const newPoint = new Point(1, 0)
    const result = point.equals(newPoint)
    expect(result).toBe(false)
  })

  it("calcDeltaXTo, moving forward", () => {
    const newPoint = new Point(1, 1)
    const result = point.calcDeltaXTo(newPoint)
    expect(result).toEqual(-1)
  })

  it("calcDeltaXTo, moving back", () => {
    const newPoint = new Point(-1, 1)
    const result = point.calcDeltaXTo(newPoint)
    expect(result).toEqual(1)
  })

  it("calcHorizontalDistanceTo", () => {
    const newPoint = new Point(1, 1)
    const result = point.calcHorizontalDistanceTo(newPoint)
    expect(result).toEqual(1)
  })

  it("calcDeltaYTo, moving forward", () => {
    const newPoint = new Point(1, 1)
    const result = point.calcDeltaYTo(newPoint)
    expect(result).toEqual(-1)
  })

  it("calcDeltaYTo, moving back", () => {
    const newPoint = new Point(1, -1)
    const result = point.calcDeltaYTo(newPoint)
    expect(result).toEqual(1)
  })

  it("calcVerticalDistance", () => {
    const newPoint = new Point(1, 1)
    const result = point.calcVerticalDistance(newPoint)
    expect(result).toEqual(1)
  })

  it("calcDistanceTo", () => {
    const newPoint = new Point(1, 1)
    const result = point.calcDistanceTo(newPoint)
    expect(result).toEqual(1.4142135623730951)
  })
})

describe("isPoint", () => {
  it("should return true", () => {
    const point = new Point(10, 10)
    const result = isPoint(point)
    expect(result).toBe(true)
  })

  it("should return false", () => {
    const point = 10
    const result = isPoint(point)
    expect(result).toBe(false)
  })
})
