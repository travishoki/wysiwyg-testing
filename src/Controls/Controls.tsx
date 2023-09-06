import React from "react"
import { LockButton } from "./LockButton/LockButton"
import { SubmitButton } from "./SubmitButton/SubmitButton"

type ControlsProps = {
  onLock: () => void
  onSubmit: () => void
}

export const Controls = ({ onLock, onSubmit }: ControlsProps) => {
  return (
    <>
      <SubmitButton onClick={onSubmit} />
      <LockButton onClick={onLock} />
    </>
  )
}
