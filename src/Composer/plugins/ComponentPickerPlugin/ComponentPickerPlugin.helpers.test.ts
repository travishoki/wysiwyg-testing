import { alignmentTypes } from "../../ui/Icon/types"
import { getAlignmentType, getHeadingType } from "./ComponentPickerPlugin.helpers"

describe("getAlignmentType", () => {
  it("should return correct heading by num", () => {
    expect(getAlignmentType("center")).toEqual("center-align")
    expect(getAlignmentType("justify")).toEqual("justify-align")
    expect(getAlignmentType("left")).toEqual("left-align")
    expect(getAlignmentType("right")).toEqual("right-align")
    expect(getAlignmentType("" as alignmentTypes)).toEqual("left-align")
  })
})

describe("getHeadingType", () => {
  it("should return correct heading by num", () => {
    expect(getHeadingType(1)).toEqual("h1")
    expect(getHeadingType(2)).toEqual("h2")
    expect(getHeadingType(3)).toEqual("h3")
    expect(getHeadingType(4)).toEqual("h4")
    expect(getHeadingType(5)).toEqual("h5")
  })
})
