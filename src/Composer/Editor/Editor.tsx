/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useEffect, useState } from "react"
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
import { useSettings } from "../context/SettingsContext"
import { useSharedHistoryContext } from "../context/SharedHistoryContext"
import { TableCellNodes } from "../nodes/Table/TableCellNodes/TableCellNodes"
import { ActionsPlugin } from "../plugins/ActionsPlugin/ActionsPlugin"
import { AutoEmbedPlugin } from "../plugins/AutoEmbedPlugin/AutoEmbedPlugin"
import { AutoLinkPlugin } from "../plugins/AutoLinkPlugin/AutoLinkPlugin"
import { AutocompletePlugin } from "../plugins/AutocompletePlugin/AutocompletePlugin"
import { CodeActionMenuPlugin } from "../plugins/CodeActionMenuPlugin/CodeActionMenuPlugin"
import { CodeHighlightPlugin } from "../plugins/CodeHighlightPlugin/CodeHighlightPlugin"
import { ComponentPickerPlugin } from "../plugins/ComponentPickerPlugin/ComponentPickerPlugin"
import { ContextMenuPlugin } from "../plugins/ContextMenuPlugin/ContextMenuPlugin"
import { DragDropPaste } from "../plugins/DragDropPastePlugin/DragDropPastePlugin"
import { DraggableBlockPlugin } from "../plugins/DraggableBlockPlugin/DraggableBlockPlugin"
import { EmojiPickerPlugin } from "../plugins/EmojiPickerPlugin/EmojiPickerPlugin"
import { EmojisPlugin } from "../plugins/EmojisPlugin/EmojisPlugin"
import { FloatingLinkEditorPlugin } from "../plugins/FloatingLinkEditorPlugin/FloatingLinkEditorPlugin"
import { FloatingTextFormatToolbarPlugin } from "../plugins/FloatingTextFormatToolbarPlugin/FloatingTextFormatToolbarPlugin"
import { ImagesPlugin } from "../plugins/ImagesPlugin/ImagesPlugin"
import { InlineImagePlugin } from "../plugins/InlineImagePlugin/InlineImagePlugin"
import { KeywordsPlugin } from "../plugins/KeywordsPlugin/KeywordsPlugin"
import { LinkPlugin } from "../plugins/LinkPlugin/LinkPlugin"
import { ListMaxIndentLevelPlugin } from "../plugins/ListMaxIndentLevelPlugin/ListMaxIndentLevelPlugin"
import { MarkdownShortcutPlugin } from "../plugins/MarkdownShortcutPlugin/MarkdownShortcutPlugin"
import { MaxLengthPlugin } from "../plugins/MaxLengthPlugin/MaxLengthPlugin"
import { MentionsPlugin } from "../plugins/MentionsPlugin/MentionsPlugin"
import { MergeFieldPlugin } from "../plugins/MergeFieldPlugin/MergeFieldPlugin"
import { TabFocusPlugin } from "../plugins/TabFocusPlugin/TabFocusPlugin"
import { TableActionMenuPlugin } from "../plugins/TableActionMenuPlugin/TableActionMenuPlugin"
import { TableCellResizerPlugin } from "../plugins/TableCellResizerPlugin/TableCellResizerPlugin"
import { TableOfContentsPlugin } from "../plugins/TableOfContentsPlugin/TableOfContentsPlugin"
import { TablePlugin as NewTablePlugin } from "../plugins/TablePlugin/TablePlugin"
import { ToolbarPlugin } from "../plugins/ToolbarPlugin/ToolbarPlugin"
import { CAN_USE_DOM } from "../shared/canUseDOM"
import { ComposerTheme } from "../themes/ComposerTheme"
import { ContentEditable } from "../ui/ContentEditable/ContentEditable"
import { Placeholder } from "../ui/Placeholder/Placeholder"
import styles from "./Editor.module.scss"

export const Editor = () => {
  const { historyState } = useSharedHistoryContext()
  const {
    settings: {
      isAutocomplete,
      isCharLimit,
      isCharLimitUtf8,
      isMaxLength,
      shouldUseLexicalContextMenu,
      showTableOfContents,
      tableCellBackgroundColor,
      tableCellMerge,
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
    namespace: "Composer",
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
      <div className={styles.editorContainer}>
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
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={
            <div className={styles.editorScroller}>
              <div className={styles.editor} ref={onRef}>
                <ContentEditable />
              </div>
            </div>
          }
          placeholder={placeholder}
        />
        <MarkdownShortcutPlugin />
        <CodeHighlightPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <ListMaxIndentLevelPlugin maxDepth={7} />
        <TablePlugin
          hasCellBackgroundColor={tableCellBackgroundColor}
          hasCellMerge={tableCellMerge}
        />
        <TableCellResizerPlugin />
        <NewTablePlugin cellEditorConfig={cellEditorConfig}>
          <AutoFocusPlugin />
          <RichTextPlugin
            ErrorBoundary={LexicalErrorBoundary}
            contentEditable={<ContentEditable className={styles.tableNodeContentEditable} />}
            placeholder={null}
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
            <TableActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge={true} />
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
    </>
  )
}
