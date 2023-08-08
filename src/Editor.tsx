/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import * as React from "react"
import { useEffect, useState } from "react"

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { CharacterLimitPlugin } from "@lexical/react/LexicalCharacterLimitPlugin"
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin"
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin"
import LexicalClickableLinkPlugin from "@lexical/react/LexicalClickableLinkPlugin"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin"
import { TablePlugin } from "@lexical/react/LexicalTablePlugin"
import useLexicalEditable from "@lexical/react/useLexicalEditable"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"

import { CAN_USE_DOM } from "./shared/canUseDOM"
import { useSettings } from "./context/SettingsContext"
import { useSharedHistoryContext } from "./context/SharedHistoryContext"
import TableCellNodes from "./nodes/TableCellNodes"
import ActionsPlugin from "./plugins/ActionsPlugin"
import AutocompletePlugin from "./plugins/AutocompletePlugin"
import AutoEmbedPlugin from "./plugins/AutoEmbedPlugin"
import AutoLinkPlugin from "./plugins/AutoLinkPlugin"
import CodeActionMenuPlugin from "./plugins/CodeActionMenuPlugin"
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin"
import ComponentPickerPlugin from "./plugins/ComponentPickerPlugin"
import ContextMenuPlugin from "./plugins/ContextMenuPlugin"
import DragDropPaste from "./plugins/DragDropPastePlugin"
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin"
import EmojiPickerPlugin from "./plugins/EmojiPickerPlugin"
import EmojisPlugin from "./plugins/EmojisPlugin"
import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin"
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatToolbarPlugin"
import MergeFieldPlugin from "./plugins/MergeFieldPlugin"
import ImagesPlugin from "./plugins/ImagesPlugin"
import InlineImagePlugin from "./plugins/InlineImagePlugin"
import KeywordsPlugin from "./plugins/KeywordsPlugin"
import LinkPlugin from "./plugins/LinkPlugin"
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin"
import MarkdownShortcutPlugin from "./plugins/MarkdownShortcutPlugin"
import { MaxLengthPlugin } from "./plugins/MaxLengthPlugin"
import MentionsPlugin from "./plugins/MentionsPlugin"
import TabFocusPlugin from "./plugins/TabFocusPlugin"
import TableCellActionMenuPlugin from "./plugins/TableActionMenuPlugin"
import TableCellResizer from "./plugins/TableCellResizer"
import TableOfContentsPlugin from "./plugins/TableOfContentsPlugin"
import { TablePlugin as NewTablePlugin } from "./plugins/TablePlugin"
import ToolbarPlugin from "./plugins/ToolbarPlugin"
import ComposerTheme from "./themes/ComposerTheme"
import ContentEditable from "./ui/ContentEditable"
import Placeholder from "./ui/Placeholder"

export default function Editor({ onChange }: EditorProps): JSX.Element {
  const { historyState } = useSharedHistoryContext()
  const {
    settings: {
      isAutocomplete,
      isMaxLength,
      isCharLimit,
      isCharLimitUtf8,
      showTableOfContents,
      shouldUseLexicalContextMenu,
      tableCellMerge,
      tableCellBackgroundColor,
    },
  } = useSettings()
  const isEditable = useLexicalEditable()
  const text = "Enter some rich text..."
  const placeholder = <Placeholder>{text}</Placeholder>
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null)
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  const cellEditorConfig = {
    namespace: "Playground",
    nodes: [...TableCellNodes],
    onError: (error: Error) => {
      throw error
    },
    theme: ComposerTheme,
  }

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport)
      }
    }
    updateViewPortWidth()
    window.addEventListener("resize", updateViewPortWidth)

    return () => {
      window.removeEventListener("resize", updateViewPortWidth)
    }
  }, [isSmallWidthViewport])

  return (
    <>
      <ToolbarPlugin />
      <div className="editor-container">
        {isMaxLength && <MaxLengthPlugin maxLength={30} />}
        <DragDropPaste />
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        <ComponentPickerPlugin />
        <EmojiPickerPlugin />
        <AutoEmbedPlugin />

        <MentionsPlugin />
        <EmojisPlugin />
        <HashtagPlugin />
        <KeywordsPlugin />
        <AutoLinkPlugin />
        <HistoryPlugin externalHistoryState={historyState} />
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor" ref={onRef}>
                <ContentEditable />
              </div>
            </div>
          }
          placeholder={placeholder}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MarkdownShortcutPlugin />
        <CodeHighlightPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <ListMaxIndentLevelPlugin maxDepth={7} />
        <TablePlugin
          hasCellMerge={tableCellMerge}
          hasCellBackgroundColor={tableCellBackgroundColor}
        />
        <TableCellResizer />
        <NewTablePlugin cellEditorConfig={cellEditorConfig}>
          <AutoFocusPlugin />
          <RichTextPlugin
            contentEditable={<ContentEditable className="TableNode__contentEditable" />}
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MentionsPlugin />
          <HistoryPlugin />
          <ImagesPlugin captionsEnabled={false} />
          <LinkPlugin />
          <LexicalClickableLinkPlugin />
          <FloatingTextFormatToolbarPlugin />
        </NewTablePlugin>
        <MergeFieldPlugin />
        <ImagesPlugin />
        <InlineImagePlugin />
        <LinkPlugin />
        {!isEditable && <LexicalClickableLinkPlugin />}
        <HorizontalRulePlugin />
        <TabFocusPlugin />
        <TabIndentationPlugin />
        {floatingAnchorElem && !isSmallWidthViewport && (
          <>
            <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
            <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
            <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
            <TableCellActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge={true} />
            <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />
          </>
        )}
        {(isCharLimit || isCharLimitUtf8) && (
          <CharacterLimitPlugin charset={isCharLimit ? "UTF-16" : "UTF-8"} maxLength={5} />
        )}
        {isAutocomplete && <AutocompletePlugin />}
        <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
        {shouldUseLexicalContextMenu && <ContextMenuPlugin />}
        <ActionsPlugin />
      </div>

      <OnChangePlugin onChange={onChange} />
    </>
  )
}

type EditorProps = {
  onChange: () => void
}
