/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react"
import { ReactNode } from "react"
import { createPortal } from "react-dom"
import { PortalImpl } from "./PortalImpl"
import "./Modal.css"

type ModalProps = {
  children: ReactNode
  closeOnClickOutside?: boolean
  onClose: () => void
  title: string
}

export const Modal = ({ onClose, children, title, closeOnClickOutside = false }: ModalProps) => {
  return createPortal(
    <PortalImpl closeOnClickOutside={closeOnClickOutside} onClose={onClose} title={title}>
      {children}
    </PortalImpl>,
    document.body,
  )
}
