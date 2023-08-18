import React, { CSSProperties, ReactNode } from "react"
import classNames from "classnames"
import styles from "./TypeaheadPopover.module.scss"

type TypeaheadPopoverProps = {
  children: ReactNode
  className?: string
  ref?: (element: HTMLElement) => void,
  style?: CSSProperties
}
export const TypeaheadPopover = ({ children, className, ref }: TypeaheadPopoverProps) => {
  return (
    <div className={classNames(styles["typeahead-popover"], className)} ref={ref}>
      {children}
    </div>
  )
}
