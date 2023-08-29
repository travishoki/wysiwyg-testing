import React, { CSSProperties, ReactNode } from "react"
import classNames from "classnames"
import styles from "./TypeaheadPopover.module.scss"

type TypeaheadPopoverProps = {
  children: ReactNode
  className?: string
  ref?: (element: HTMLDivElement) => void
  style?: CSSProperties
}
export const TypeaheadPopover = ({ children, className, ref }: TypeaheadPopoverProps) => {
  if (ref) {
    return (
      <div className={classNames(styles.typeaheadPopover, className)} ref={ref}>
        {children}
      </div>
    )
  }

  return <div className={classNames(styles.typeaheadPopover, className)}>{children}</div>
}
