import React, { CSSProperties, useRef } from "react"
import { clamp } from "./helpers"

export interface Position {
  x: number
  y: number
}

interface MoveWrapperProps {
  children: JSX.Element
  className?: string
  onChange: (position: Position) => void
  style?: CSSProperties
}

export const MoveWrapper = ({ children, className, onChange, style }: MoveWrapperProps) => {
  const divRef = useRef<HTMLDivElement>(null)

  const move = (e: React.MouseEvent | MouseEvent): void => {
    if (divRef.current) {
      const { current: div } = divRef
      const { height, left, top, width } = div.getBoundingClientRect()

      const x = clamp(e.clientX - left, width, 0)
      const y = clamp(e.clientY - top, height, 0)

      onChange({ x, y })
    }
  }

  const onMouseDown = (e: React.MouseEvent): void => {
    if (e.button !== 0) return

    move(e)

    const onMouseMove = (_e: MouseEvent): void => {
      move(_e)
    }

    const onMouseUp = (_e: MouseEvent): void => {
      document.removeEventListener("mousemove", onMouseMove, false)
      document.removeEventListener("mouseup", onMouseUp, false)

      move(_e)
    }

    document.addEventListener("mousemove", onMouseMove, false)
    document.addEventListener("mouseup", onMouseUp, false)
  }

  return (
    <div className={className} onMouseDown={onMouseDown} ref={divRef} style={style}>
      {children}
    </div>
  )
}
