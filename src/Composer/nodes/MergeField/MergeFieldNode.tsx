import React, { Suspense } from "react"
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
import { getFormatTypeClass, styleObjectToString, wrapElementWith } from "./MergeFieldNode.helpers"
import { TEXT_TYPE_TO_FORMAT } from "./const"

const MergeFieldComponent = React.lazy(
  // @ts-ignore
  () => import("./MergeFieldComponent/MergeFieldComponent"),
)

type SerializedMergeFieldNode = Spread<
  {
    __format: number
    mergeFieldId: ID
    mergeFieldName: string
    style: Record<string, string>
  },
  SerializedLexicalNode
>

export class MergeFieldNode extends DecoratorNode<JSX.Element> {
  __format: number

  mergeFieldId: ID

  mergeFieldName: string

  style: Record<string, string>

  static getType(): string {
    return "merge-field"
  }

  static clone(node: MergeFieldNode): MergeFieldNode {
    return new MergeFieldNode(node.mergeFieldId, node.mergeFieldName, node.style)
  }

  convertMergeFieldElement(domNode: Node): null | DOMConversionOutput {
    if (domNode instanceof HTMLElement) {
      const node = $createMergeFieldNode(this.mergeFieldId, this.mergeFieldName, this.style)

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

  constructor(mergeFieldId: ID, mergeFieldName: string, style: Record<string, string>) {
    super()
    this.__format = 0
    this.mergeFieldId = mergeFieldId
    this.mergeFieldName = mergeFieldName
    this.style = style
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
      serializedNode.style,
    )
    node.setFormat(serializedNode.__format)

    return node
  }

  exportJSON(): SerializedMergeFieldNode {
    return {
      __format: this.getFormat(),
      mergeFieldId: this.getMergeFieldId(),
      mergeFieldName: this.getMergeFieldName(),
      style: this.getStyle(),
      type: "merge-field",
      version: 1,
    }
  }

  getMergeFieldId(): string {
    const self = this.getLatest()

    return self.mergeFieldId
  }

  getMergeFieldName(): string {
    const self = this.getLatest()

    return self.mergeFieldName
  }

  getStyle(): Record<string, string> {
    const self = this.getLatest()

    return self.style
  }

  exportDOM(): DOMExportOutput {
    let element = document.createElement("span")
    const formatClasses = getFormatTypeClass(this.getFormat())
    const style = styleObjectToString(this.getStyle())

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

  public setStyle(styleName: string, option: string) {
    const writable = this.getWritable()

    writable.style = {
      [camelCase(styleName)]: option,
    }
  }

  public clearStyle() {
    const writable = this.getWritable()

    writable.style = {}
  }

  getFormat() {
    const self = this.getLatest()

    return self.__format
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

  public toggleFormatType(type: TextFormatType) {
    const formatFlag = TEXT_TYPE_TO_FORMAT[type]

    return this.setFormat(this.getFormat() ^ formatFlag)
  }

  decorate(_editor: LexicalEditor) {
    return (
      <Suspense fallback={<ComposerNodeFallback />}>
        <MergeFieldComponent
          className={getFormatTypeClass(this.getFormat())}
          mergeFieldName={this.mergeFieldName}
          nodeKey={this.getKey()}
          style={this.getStyle()}
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
  style: Record<string, string>,
): MergeFieldNode => {
  return $applyNodeReplacement(new MergeFieldNode(mergeFieldId, mergeFieldName, style))
}
