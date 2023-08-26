import React from "react"
import { Button } from "../Composer/Controls/Button/Button"

type SubmitButtonProps = {
  onClick: () => void
}

export const SubmitButton = ({ onClick }: SubmitButtonProps) => {
  return <Button onClick={onClick} title="Submit" />
}
