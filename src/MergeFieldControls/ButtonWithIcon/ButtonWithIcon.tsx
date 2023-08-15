import React from "react"

import "./ButtonWithIcon.css"

type ButtonWithIconProps = {
  iconUrl: string
  onClick: () => void
  title: string
}

export const ButtonWithIcon = ({ iconUrl, onClick, title }: ButtonWithIconProps) => (
  <button className="control-button" onClick={onClick}>
    <div className="control-button-inner">
      {iconUrl && <img className="icon" alt={title} height="15" src={iconUrl} width="15" />}
      {title}
    </div>
  </button>
)
