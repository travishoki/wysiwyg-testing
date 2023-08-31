import React, { CSSProperties, ReactNode } from "react"
import classNames from "classnames"
import styles from "./TypeaheadPopover.module.scss"

type TypeaheadPopoverProps = {
  children: ReactNode
  className?: string
  ref?: (element: HTMLDivElement) => void
  style?: CSSProperties
}
export const TypeaheadPopover = ({ children, className, ref, style }: TypeaheadPopoverProps) => {
  if (ref) {
    return (
      <div className={classNames(styles.typeaheadPopover, className)} ref={ref} style={style}>
        {children}
      </div>
    )
  }

  return (
    <div className={classNames(styles.typeaheadPopover, className)} style={style}>
      {children}
    </div>
  )
}
