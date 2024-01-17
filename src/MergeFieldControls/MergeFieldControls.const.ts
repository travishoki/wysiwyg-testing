import { MergeField } from "types"

const updatedAt = "2023-01-01"

export const mergeFieldNameArray: MergeField[] = [
  {
    __typename: "MergeField",
    id: "111",
    name: "aaa",
    updatedAt,
  },
  {
    __typename: "MergeField",
    id: "222",
    name: "baa",
    updatedAt,
  },
  {
    __typename: "MergeField",
    id: "333",
    name: "aab",
    updatedAt,
  },
]
