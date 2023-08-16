import * as React from "react"
import { ReactNode, useEffect, useRef } from "react"

type PortalImplProps = {
  children: ReactNode
  closeOnClickOutside: boolean
  onClose: () => void
  title: string
}

export const PortalImpl = ({ onClose, children, title, closeOnClickOutside }: PortalImplProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (modalRef.current !== null) {
      modalRef.current.focus()
    }
  }, [])

  useEffect(() => {
    let modalOverlayElement: HTMLElement | null = null
    const handler = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        onClose()
      }
    }
    const clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target
      if (
        modalRef.current !== null &&
        !modalRef.current.contains(target as Node) &&
        closeOnClickOutside
      ) {
        onClose()
      }
    }
    const modelElement = modalRef.current
    if (modelElement !== null) {
      modalOverlayElement = modelElement.parentElement
      if (modalOverlayElement !== null) {
        modalOverlayElement.addEventListener("click", clickOutsideHandler)
      }
    }

    window.addEventListener("keydown", handler)

    return () => {
      window.removeEventListener("keydown", handler)
      if (modalOverlayElement !== null) {
        modalOverlayElement?.removeEventListener("click", clickOutsideHandler)
      }
    }
  }, [closeOnClickOutside, onClose])

  return (
    <div className="Modal__overlay" role="dialog">
      <div className="Modal__modal" ref={modalRef} tabIndex={-1}>
        <h2 className="Modal__title">{title}</h2>
        <button
          aria-label="Close modal"
          className="Modal__closeButton"
          onClick={onClose}
          type="button"
        >
          X
        </button>
        <div className="Modal__content">{children}</div>
      </div>
    </div>
  )
}
