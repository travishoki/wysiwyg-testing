import { TextNode } from "lexical"
import { $createEmojiNode } from "../../nodes/Emoji/EmojiNode"

const emojis: Map<string, [string, string]> = new Map([
  [":)", ["emoji composer__happySmile", "🙂"]],
  [":D", ["emoji composer__veryHappySmile", "😀"]],
  [":(", ["emoji composer__unhappySmile", "🙁"]],
  ["<3", ["emoji composer__heart", "❤"]],
  ["🙂", ["emoji composer__happySmile", "🙂"]],
  ["😀", ["emoji composer__veryHappySmile", "😀"]],
  ["🙁", ["emoji composer__unhappySmile", "🙁"]],
  ["❤", ["emoji composer__heart", "❤"]],
])

export const findAndTransformEmoji = (node: TextNode): null | TextNode => {
  const text = node.getTextContent()

  for (let i = 0; i < text.length; i++) {
    const emojiData = emojis.get(text[i]) || emojis.get(text.slice(i, i + 2))

    if (emojiData !== undefined) {
      const [emojiStyle, emojiText] = emojiData
      let targetNode

      if (i === 0) {
        ;[targetNode] = node.splitText(i + 2)
      } else {
        ;[, targetNode] = node.splitText(i, i + 2)
      }

      const emojiNode = $createEmojiNode(emojiStyle, emojiText)
      targetNode.replace(emojiNode)

      return emojiNode
    }
  }

  return null
}
