/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, {
  ContentEditable as LexicalContentEditable,
} from "@lexical/react/LexicalContentEditable"
import classNames from "classnames"
import styles from "./ContentEditable.module.scss"

type ContentEditableProps = {
  className?: string
}

export const ContentEditable = ({ className }: ContentEditableProps) => {
  return (
    <LexicalContentEditable
      className={className || classNames("composer__contentEditable", styles.contentEditable)}
    />
  )
}
