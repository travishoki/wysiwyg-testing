import React from "react"
import { SubmitButton } from "Controls/SubmitButton/SubmitButton"
import { LockButton } from "./LockButton/LockButton"

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
