/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react"
import { AutoEmbedOption, LexicalAutoEmbedPlugin } from "@lexical/react/LexicalAutoEmbedPlugin"
import * as ReactDOM from "react-dom"
import { TypeaheadPopover } from "../../TypeaheadPopover/TypeaheadPopover"
import { useModal } from "../../hooks/useModal"
import { AutoEmbedDialog } from "./AutoEmbedDialog"
import { AutoEmbedMenu } from "./AutoEmbedMenu"
import { PlaygroundEmbedConfig } from "./PlaygroundEmbedConfig"
import styles from "./index.module.scss"

const EmbedConfigs: PlaygroundEmbedConfig[] = []

export const AutoEmbedPlugin = () => {
  const [modal, showModal] = useModal()

  const openEmbedModal = (embedConfig: PlaygroundEmbedConfig) => {
    showModal(`Embed ${embedConfig.contentName}`, (onClose) => (
      <AutoEmbedDialog embedConfig={embedConfig} onClose={onClose} />
    ))
  }

  const getMenuOptions = (
    activeEmbedConfig: PlaygroundEmbedConfig,
    embedFn: () => void,
    dismissFn: () => void,
  ) => {
    return [
      new AutoEmbedOption("Dismiss", {
        onSelect: dismissFn,
      }),
      new AutoEmbedOption(`Embed ${activeEmbedConfig.contentName}`, {
        onSelect: embedFn,
      }),
    ]
  }

  return (
    <>
      {modal}
      <LexicalAutoEmbedPlugin<PlaygroundEmbedConfig>
        embedConfigs={EmbedConfigs}
        getMenuOptions={getMenuOptions}
        menuRenderFn={(
          anchorElementRef,
          { options, selectOptionAndCleanUp, selectedIndex, setHighlightedIndex },
        ) =>
          anchorElementRef.current
            ? ReactDOM.createPortal(
                <TypeaheadPopover
                  className={styles["auto-embed-menu"]}
                  style={{
                    marginLeft: anchorElementRef.current.style.width,
                    width: 200,
                  }}
                >
                  <AutoEmbedMenu
                    onOptionClick={(option: AutoEmbedOption, index: number) => {
                      setHighlightedIndex(index)
                      selectOptionAndCleanUp(option)
                    }}
                    onOptionMouseEnter={(index: number) => {
                      setHighlightedIndex(index)
                    }}
                    options={options}
                    selectedItemIndex={selectedIndex}
                  />
                </TypeaheadPopover>,
                anchorElementRef.current,
              )
            : null
        }
        onOpenEmbedModalForConfig={openEmbedModal}
      />
    </>
  )
}
