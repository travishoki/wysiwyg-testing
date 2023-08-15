import React from "react"

import "./Button.css"

type ButtonProps = {
  onClick: () => void
  title: string
}

export const Button = ({ onClick, title }: ButtonProps) => (
  <button className="control-button" onClick={onClick}>
    {title}
  </button>
)
