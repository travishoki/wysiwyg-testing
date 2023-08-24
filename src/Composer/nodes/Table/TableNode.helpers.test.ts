import { asMock } from "test/utils/mock"
import { createUID } from "../../helpers/uid"
import { Maybe } from "../../types/globals"
import { extractRowsFromHTML } from "./TableNode.helpers"

jest.mock("../../helpers/uid")

describe("extractRowsFromHTML", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return an empty array", () => {
    const table = document.createElement("table")
    const tbody = document.createElement("tbody")
    const tr = document.createElement("tr")

    tbody.appendChild(tr)
    table.appendChild(tbody)

    const result = extractRowsFromHTML(table)
    expect(result).toEqual([])
  })

  it("should return the row as json", () => {
    const innerText = "foo"
    const id1 = "123"
    const id2 = "456"

    asMock(createUID).mockReturnValueOnce(id1).mockReturnValue(id2)

    const table = document.createElement("table")
    const tbody = document.createElement("tbody")
    const tr = document.createElement("tr")
    const th = document.createElement("th")

    th.innerText = innerText

    tr.appendChild(th)
    tbody.appendChild(tr)
    table.appendChild(tbody)

    const result = extractRowsFromHTML(table)
    const nullNum: Maybe<number> = null
    const expectedResult = [
      {
        cells: [
          {
            colSpan: 1,
            id: id1,
            json: JSON.stringify({
              root: {
                children: [
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                        text: innerText,
                        type: "text",
                        version: 1,
                      },
                    ],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    type: "paragraph",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "root",
                version: 1,
              },
            }),
            type: "header",
            width: nullNum,
          },
        ],
        height: nullNum,
        id: id2,
      },
    ]
    expect(result).toEqual(expectedResult)
  })
})
