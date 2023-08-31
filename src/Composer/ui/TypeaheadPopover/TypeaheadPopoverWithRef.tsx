import React, { forwardRef, CSSProperties, ReactNode } from "react"
import classNames from "classnames"
import styles from "./TypeaheadPopover.module.scss"

type TypeaheadPopoverProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
}
type RefType = (element: HTMLDivElement) => void

export const TypeaheadPopoverWithRef = forwardRef((props: TypeaheadPopoverProps, ref: RefType) => {
  const { children, className, style } = props

  return (
    <div className={classNames(styles.typeaheadPopover, className)} ref={ref} style={style}>
      {children}
    </div>
  )
})
