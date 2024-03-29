import React, { Suspense } from "react"
import { HeadingTagType } from "@lexical/rich-text"
import classNames from "classnames"
import {
  $applyNodeReplacement,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  DecoratorNode,
  LexicalEditor,
  LexicalNode,
  SerializedLexicalNode,
  Spread,
  TextFormatType,
} from "lexical"
import { camelCase } from "lodash"
import { ComposerNodeFallback } from "../../ui/ComposerNodeFallback/ComposerNodeFallback"
import {
  getFormatTypeClass,
  getHeadingClass,
  styleObjectToString,
  styleStringToObject,
  wrapElementWith,
} from "./MergeFieldNode.helpers"
import { TEXT_TYPE_TO_FORMAT } from "./const"

const MergeFieldComponent = React.lazy(
  // @ts-ignore
  () => import("./MergeFieldComponent/MergeFieldComponent"),
)

type SerializedMergeFieldNode = Spread<
  {
    __format: number
    __style: string
    mergeFieldId: ID
    mergeFieldName: string
  },
  SerializedLexicalNode
>

export class MergeFieldNode extends DecoratorNode<JSX.Element> {
  __format: number

  __style: string

  __tag: HeadingTagType | string

  mergeFieldId: ID

  mergeFieldName: string

  static getType(): string {
    return "merge-field"
  }

  static clone(node: MergeFieldNode): MergeFieldNode {
    return new MergeFieldNode(node.mergeFieldId, node.mergeFieldName, node.__format, node.__style)
  }

  constructor(mergeFieldId: ID, mergeFieldName: string, format: number, style: string) {
    super()
    this.__format = format
    this.__style = style
    this.__tag = "span"
    this.mergeFieldId = mergeFieldId
    this.mergeFieldName = mergeFieldName
  }

  convertMergeFieldElement(domNode: Node): null | DOMConversionOutput {
    if (domNode instanceof HTMLElement) {
      const node = $createMergeFieldNode(
        this.mergeFieldId,
        this.mergeFieldName,
        this.__format,
        this.__style,
      )

      return { node }
    }

    return null
  }

  importDOM(): DOMConversionMap | null {
    return {
      span: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute("data-merge-field-component")) {
          return null
        }

        return {
          conversion: this.convertMergeFieldElement,
          priority: 1,
        }
      },
    }
  }

  /* eslint-disable-next-line class-methods-use-this */
  createDOM(): HTMLElement {
    const element = document.createElement("span")
    element.className = "merge-field"

    return element
  }

  static importJSON(serializedNode: SerializedMergeFieldNode): MergeFieldNode {
    const node = $createMergeFieldNode(
      serializedNode.mergeFieldId,
      serializedNode.mergeFieldName,
      serializedNode.__format,
      serializedNode.__style,
    )

    return node
  }

  exportJSON(): SerializedMergeFieldNode {
    return {
      __format: this.getFormat(),
      __style: this.getStyle(),
      mergeFieldId: this.getMergeFieldId(),
      mergeFieldName: this.getMergeFieldName(),
      type: "merge-field",
      version: 1,
    }
  }

  exportDOM(): DOMExportOutput {
    let tag = this.getTag()
    if (tag === "") tag = "span"
    let element = document.createElement(tag)
    const formatClasses = this.getClassNames()
    const style = this.getStyle()

    element.className = `merge-field ${formatClasses}`
    element.textContent = `{{${this.mergeFieldId}}}`

    if (style !== "") {
      element.setAttribute("style", style)
    }

    if (element !== null) {
      if (this.hasFormat("bold")) {
        element = wrapElementWith(element, "b")
      }
      if (this.hasFormat("italic")) {
        element = wrapElementWith(element, "i")
      }
      if (this.hasFormat("strikethrough")) {
        element = wrapElementWith(element, "s")
      }
      if (this.hasFormat("underline")) {
        element = wrapElementWith(element, "u")
      }
    }

    return { element }
  }

  /* eslint-disable-next-line class-methods-use-this */
  updateDOM(): false {
    return false
  }

  public setStyle(style: string) {
    const self = this.getWritable()

    self.__style = style

    return self
  }

  public setTag(tag: HeadingTagType | string) {
    const self = this.getWritable()

    self.__tag = tag

    return self
  }

  public setStyleValue(styleName: string, option: string) {
    const self = this.getWritable()
    const styleObj = styleStringToObject(this.getStyle())

    styleObj[camelCase(styleName)] = option

    self.__style = styleObjectToString(styleObj)

    return self
  }

  public toggleFormatType(type: TextFormatType) {
    const formatFlag = TEXT_TYPE_TO_FORMAT[type]
    const newFormat = this.getFormat() ^ formatFlag

    return this.setFormat(newFormat)
  }

  getMergeFieldId(): string {
    return this.getLatest().mergeFieldId
  }

  getMergeFieldName(): string {
    return this.getLatest().mergeFieldName
  }

  getStyle(): string {
    return this.getLatest().__style
  }

  getFormat(): number {
    return this.getLatest().__format
  }

  getTag(): HeadingTagType | string {
    return this.getLatest().__tag
  }

  getClassNames() {
    return classNames(getFormatTypeClass(this.getFormat()), getHeadingClass(this.getTag()))
  }

  setFormat(format: TextFormatType | number) {
    const self = this.getWritable()

    self.__format = typeof format === "string" ? TEXT_TYPE_TO_FORMAT[format] : format

    return self
  }

  hasFormat(type: TextFormatType) {
    const formatFlag = TEXT_TYPE_TO_FORMAT[type]

    return (this.getFormat() & formatFlag) !== 0
  }

  decorate(_editor: LexicalEditor) {
    return (
      <Suspense fallback={<ComposerNodeFallback />}>
        <MergeFieldComponent
          className={this.getClassNames()}
          mergeFieldName={this.mergeFieldName}
          nodeKey={this.getKey()}
          style={styleStringToObject(this.getStyle())}
        />
      </Suspense>
    )
  }
}

export const $isMergeFieldNode = (node: LexicalNode | null | undefined): node is MergeFieldNode => {
  return node instanceof MergeFieldNode
}

export const $createMergeFieldNode = (
  mergeFieldId: ID,
  mergeFieldName: string,
  format: number,
  style: string,
): MergeFieldNode => {
  return $applyNodeReplacement(new MergeFieldNode(mergeFieldId, mergeFieldName, format, style))
}
