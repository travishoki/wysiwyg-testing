import React, { CSSProperties, ReactNode } from "react"
import classNames from "classnames"
import styles from "./TypeaheadPopover.module.scss"

type TypeaheadPopoverProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
}
export const TypeaheadPopover = ({ children, className, style }: TypeaheadPopoverProps) => {
  return (
    <div className={classNames(styles.typeaheadPopover, className)} style={style}>
      {children}
    </div>
  )
}
