import { ReactNode } from "react"

export type DialogProps = Readonly<{
  children: ReactNode
  "data-test-id"?: string
}>
