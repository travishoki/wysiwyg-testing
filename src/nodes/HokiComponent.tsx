import * as React from "react"
import { Suspense } from "react"
import "./HokiComponent.css"

import ImageFile from "../images/icons/file-image.svg"
import ImageClose from "../images/icons/close.svg"

export default function HokiComponent(): JSX.Element {
  return (
    <Suspense fallback={null}>
      <img alt="icon" className="svg" height="15" src={ImageFile} width="15" />
      <>Hoki was here!</>
      <img alt="close" className="svg" height="15" src={ImageClose} width="15" />
    </Suspense>
  )
}
