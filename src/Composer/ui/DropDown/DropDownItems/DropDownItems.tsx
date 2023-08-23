import React, { useCallback, useEffect, useMemo, useState, ReactNode } from "react"
import stylesDropdown from "../DropDown.module.scss"
import { DropDownContext } from "../DropDown.types"

type DropDownItemsProps = {
  children: ReactNode
  dropDownRef: React.Ref<HTMLDivElement>
  onClose: () => void
}

export const DropDownItems = ({ children, dropDownRef, onClose }: DropDownItemsProps) => {
  const [items, setItems] = useState<React.RefObject<HTMLButtonElement>[]>()
  const [highlightedItem, setHighlightedItem] = useState<React.RefObject<HTMLButtonElement>>()

  const registerItem = useCallback(
    (itemRef: React.RefObject<HTMLButtonElement>) => {
      setItems((prev) => (prev ? [...prev, itemRef] : [itemRef]))
    },
    [setItems],
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!items) return

    const key = event.key

    if (["Escape", "ArrowUp", "ArrowDown", "Tab"].includes(key)) {
      event.preventDefault()
    }

    if (key === "Escape" || key === "Tab") {
      onClose()
    } else if (key === "ArrowUp") {
      setHighlightedItem((prev) => {
        if (!prev) return items[0]
        const index = items.indexOf(prev) - 1

        return items[index === -1 ? items.length - 1 : index]
      })
    } else if (key === "ArrowDown") {
      setHighlightedItem((prev) => {
        if (!prev) return items[0]

        return items[items.indexOf(prev) + 1]
      })
    }
  }

  const contextValue = useMemo(
    () => ({
      registerItem,
    }),
    [registerItem],
  )

  useEffect(() => {
    if (items && !highlightedItem) {
      setHighlightedItem(items[0])
    }

    if (highlightedItem && highlightedItem.current) {
      highlightedItem.current.focus()
    }
  }, [items, highlightedItem])

  return (
    <DropDownContext.Provider value={contextValue}>
      <div className={stylesDropdown.dropdown} onKeyDown={handleKeyDown} ref={dropDownRef}>
        {children}
      </div>
    </DropDownContext.Provider>
  )
}
