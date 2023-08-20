/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { ReactNode, useEffect, useRef, useState } from "react"
import classNames from "classnames"
import { createPortal } from "react-dom"
import { IconBare } from "../../Icon/IconBare"
import stylesToolbar from "../../plugins/ToolbarPlugin/index.module.scss"
import styles from "./DropDown.module.scss"
import { DropDownItems } from "./DropDownItems"

const dropDownPadding = 4

type DropDownProps = {
  buttonAriaLabel?: string
  buttonClassName: string
  buttonIconClassName?: string
  buttonLabel?: string
  children: ReactNode
  disabled?: boolean
  stopCloseOnClickSelf?: boolean
}

export const DropDown = ({
  buttonAriaLabel,
  buttonClassName,
  buttonIconClassName,
  buttonLabel,
  children,
  disabled = false,
  stopCloseOnClickSelf,
}: DropDownProps) => {
  const dropDownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [showDropDown, setShowDropDown] = useState(false)

  const handleClose = () => {
    setShowDropDown(false)
    if (buttonRef && buttonRef.current) {
      buttonRef.current.focus()
    }
  }

  useEffect(() => {
    const button = buttonRef.current
    const dropDown = dropDownRef.current

    if (showDropDown && button !== null && dropDown !== null) {
      const { left, top } = button.getBoundingClientRect()
      dropDown.style.top = `${top + button.offsetHeight + dropDownPadding}px`
      dropDown.style.left = `${Math.min(left, window.innerWidth - dropDown.offsetWidth - 20)}px`
    }
  }, [dropDownRef, buttonRef, showDropDown])

  useEffect(() => {
    const button = buttonRef.current

    if (button !== null && showDropDown) {
      const handle = (event: MouseEvent) => {
        const target = event.target
        if (stopCloseOnClickSelf) {
          if (dropDownRef.current && dropDownRef.current.contains(target as Node)) return
        }
        if (!button.contains(target as Node)) {
          setShowDropDown(false)
        }
      }
      document.addEventListener("click", handle)

      return () => {
        document.removeEventListener("click", handle)
      }
    }
  }, [dropDownRef, buttonRef, showDropDown, stopCloseOnClickSelf])

  useEffect(() => {
    const handleButtonPositionUpdate = () => {
      if (showDropDown) {
        const button = buttonRef.current
        const dropDown = dropDownRef.current
        if (button !== null && dropDown !== null) {
          const { top } = button.getBoundingClientRect()
          const newPosition = top + button.offsetHeight + dropDownPadding
          if (newPosition !== dropDown.getBoundingClientRect().top) {
            dropDown.style.top = `${newPosition}px`
          }
        }
      }
    }

    document.addEventListener("scroll", handleButtonPositionUpdate)

    return () => {
      document.removeEventListener("scroll", handleButtonPositionUpdate)
    }
  }, [buttonRef, dropDownRef, showDropDown])

  return (
    <>
      <button
        aria-label={buttonAriaLabel || buttonLabel}
        className={buttonClassName}
        disabled={disabled}
        onClick={() => setShowDropDown(!showDropDown)}
        ref={buttonRef}
        type="button"
      >
        {buttonIconClassName && <span className={buttonIconClassName} />}
        {buttonLabel && (
          <span
            className={classNames(
              stylesToolbar.text,
              "dropdown-button-text",
              styles.dropdownButtonText,
            )}
          >
            {buttonLabel}
          </span>
        )}
        <IconBare className={stylesToolbar["chevron-down"]} type="chevron-down" />
      </button>

      {showDropDown &&
        createPortal(
          <DropDownItems dropDownRef={dropDownRef} onClose={handleClose}>
            {children}
          </DropDownItems>,
          document.body,
        )}
    </>
  )
}
