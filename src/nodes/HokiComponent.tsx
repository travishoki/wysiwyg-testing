import * as React from "react"
import { Suspense } from "react"

export default function HokiComponent(): JSX.Element {
  return (
    <Suspense fallback={null}>
      <div>
        <p>Hoki is Here</p>
      </div>
    </Suspense>
  )
}
