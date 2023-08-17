import React from "react"
import { useSharedAutocompleteContext } from "../../context/SharedAutocompleteContext"

export const AutocompleteComponent = () => {
  const [suggestion] = useSharedAutocompleteContext()
  const userAgentData = window.navigator.userAgentData
  const isMobile =
    userAgentData !== undefined
      ? userAgentData.mobile
      : window.innerWidth <= 800 && window.innerHeight <= 600

  // TODO Move to theme
  return (
    <span spellCheck="false" style={{ color: "#ccc" }}>
      {suggestion} {isMobile ? "(SWIPE \u2B95)" : "(TAB)"}
    </span>
  )
}
