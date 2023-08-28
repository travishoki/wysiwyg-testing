import React from "react"
import { Button } from "../Button/Button"

type LockButtonProps = {
  onClick: () => void
}

export const LockButton = ({ onClick }: LockButtonProps) => {
  return <Button onClick={onClick} title="Lock" />
}
