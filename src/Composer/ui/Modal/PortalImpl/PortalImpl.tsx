import React, { ReactNode, useEffect, useRef } from "react"
import styles from "../Modal.module.scss"
import { ButtonClose } from "./ButtonClose/ButtonClose"

type PortalImplProps = {
  children: ReactNode
  closeOnClickOutside: boolean
  onClose: () => void
  title: string
}

export const PortalImpl = ({ children, closeOnClickOutside, onClose, title }: PortalImplProps) => {
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
    <div className={styles.modalOverlay} role="dialog">
      <div className={styles.modal} ref={modalRef} tabIndex={-1}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <ButtonClose onClick={onClose} />
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  )
}
