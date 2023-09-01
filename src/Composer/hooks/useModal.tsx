/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useCallback, useMemo, useState } from "react"
import { Modal } from "../ui/Modal/Modal"

export type showModalType = (title: string, showModal: (onClose: () => void) => JSX.Element) => void

export const useModal = (): [
  JSX.Element | null,
  (title: string, showModal: (onClose: () => void) => JSX.Element) => void,
] => {
  const [modalContent, setModalContent] = useState<null | {
    closeOnClickOutside: boolean
    content: JSX.Element
    title: string
  }>(null)

  const onClose = useCallback(() => {
    setModalContent(null)
  }, [])

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null
    }
    const { closeOnClickOutside, content, title } = modalContent

    return (
      <Modal closeOnClickOutside={closeOnClickOutside} onClose={onClose} title={title}>
        {content}
      </Modal>
    )
  }, [modalContent, onClose])

  const showModal: showModalType = useCallback(
    (
      title: string,
      getContent: (onClose: () => void) => JSX.Element,
      closeOnClickOutside = false,
    ) => {
      setModalContent({
        closeOnClickOutside,
        content: getContent(onClose),
        title,
      })
    },
    [onClose],
  )

  return [modal, showModal]
}
