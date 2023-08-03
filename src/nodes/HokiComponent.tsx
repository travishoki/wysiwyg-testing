import * as React from "react"
import { Suspense } from "react"
import "./HokiComponent.css"

export default function HokiComponent(): JSX.Element {
  return (
    <Suspense fallback={null}>
      <>Hoki was here!</>
    </Suspense>
  )
}
