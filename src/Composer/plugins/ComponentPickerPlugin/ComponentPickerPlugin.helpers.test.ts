import i18next from "i18next"
import { TFunction } from "react-i18next"
import { alignmentTypes } from "../../ui/Icon/types"
import { getAlignmentType, getHeadingTitle, getHeadingType } from "./ComponentPickerPlugin.helpers"

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

describe("getHeadingTitle", () => {
  const t = i18next.t as TFunction<"scenes", "composer">

  it("should return correct heading by num", () => {
    expect(getHeadingTitle(1, t)).toEqual(t("Heading 1"))
    expect(getHeadingTitle(2, t)).toEqual(t("Heading 2"))
    expect(getHeadingTitle(3, t)).toEqual(t("Heading 3"))
    expect(getHeadingTitle(4, t)).toEqual(t("Heading 4"))
    expect(getHeadingTitle(5, t)).toEqual(t("Heading 5"))
  })
})
