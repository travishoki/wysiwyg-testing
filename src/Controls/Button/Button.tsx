import React from "react"

import "./Button.css"

export const Button = ({ onClick, title }: ButtonProps) => (
  <button className="control-button" onClick={onClick}>
    {title}
  </button>
)

type ButtonProps = {
  iconUrl: string
  onClick: () => void
  title: string
}
