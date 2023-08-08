import * as React from "react"

import { MergeFieldButton } from "./MergeFieldButton/MergeFieldButton"
import { mergeFieldKeyArray } from "./const"
import "./MergeFieldControls.css"

export const MergeFieldControls = () => (
  <div className="controls">
    {mergeFieldKeyArray.map((mergeFieldKey) => (
      <MergeFieldButton
        key={mergeFieldKey.key}
        mergeFieldIconUrl={mergeFieldKey.iconUrl}
        mergeFieldKey={mergeFieldKey.key}
      />
    ))}
  </div>
)
