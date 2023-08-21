import { TextNode } from "lexical"
import { $createEmojiNode } from "../../nodes/Emoji/EmojiNode"

const emojis: Map<string, [string, string]> = new Map([
  [":)", ["emoji happySmile", "🙂"]],
  [":D", ["emoji veryHappySmile", "😀"]],
  [":(", ["emoji unhappySmile", "🙁"]],
  ["<3", ["emoji heart", "❤"]],
  ["🙂", ["emoji happySmile", "🙂"]],
  ["😀", ["emoji veryHappySmile", "😀"]],
  ["🙁", ["emoji unhappySmile", "🙁"]],
  ["❤", ["emoji heart", "❤"]],
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
