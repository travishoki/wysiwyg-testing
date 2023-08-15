import * as React from "react"
import { DialogProps } from "./types"

export function DialogButtonsList({ children }: DialogProps): JSX.Element {
  return <div className="DialogButtonsList">{children}</div>
}
