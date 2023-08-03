import * as React from "react"
import { Suspense } from "react"
import "./HokiComponent.css"

import ImageFile from "../images/icons/file-image.svg"
import ImageClose from "../images/icons/close.svg"

export default function HokiComponent(): JSX.Element {
  return (
    <Suspense fallback={null}>
      <div className="hoki-component-inner">
        <div className="hoki-component-content">
          <img alt="icon" className="svg-icon" height="15" src={ImageFile} width="15" />
          <p>Hoki was here!</p>
        </div>
        <img alt="close" className="svg-close" height="15" src={ImageClose} width="15" />
      </div>
    </Suspense>
  )
}
