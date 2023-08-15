/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react"
import { ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { DropDownItems } from "./DropDownItems"

const dropDownPadding = 4

type DropDownProps = {
  disabled?: boolean
  buttonAriaLabel?: string
  buttonClassName: string
  buttonIconClassName?: string
  buttonLabel?: string
  children: ReactNode
  stopCloseOnClickSelf?: boolean
}

export const DropDown = ({
  disabled = false,
  buttonLabel,
  buttonAriaLabel,
  buttonClassName,
  buttonIconClassName,
  children,
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
      const { top, left } = button.getBoundingClientRect()
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
        type="button"
        disabled={disabled}
        aria-label={buttonAriaLabel || buttonLabel}
        className={buttonClassName}
        onClick={() => setShowDropDown(!showDropDown)}
        ref={buttonRef}
      >
        {buttonIconClassName && <span className={buttonIconClassName} />}
        {buttonLabel && <span className="text dropdown-button-text">{buttonLabel}</span>}
        <i className="chevron-down" />
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
