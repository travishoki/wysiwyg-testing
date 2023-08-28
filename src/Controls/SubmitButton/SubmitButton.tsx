import React from "react"
import { Button } from "../Button/Button"

type SubmitButtonProps = {
  onClick: () => void
}

export const SubmitButton = ({ onClick }: SubmitButtonProps) => {
  return <Button onClick={onClick} title="Submit" />
}
