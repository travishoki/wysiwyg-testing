import * as React from "react"
import { DialogProps } from "./DialogTypes"

export function DialogButtonsList({ children }: DialogProps): JSX.Element {
  return <div className="DialogButtonsList">{children}</div>
}
