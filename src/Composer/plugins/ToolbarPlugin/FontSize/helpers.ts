import { MAX_ALLOWED_FONT_SIZE, MIN_ALLOWED_FONT_SIZE } from "./const"
import { updateFontSizeType } from "./types"

/**
 * Calculates the new font size based on the update type.
 * @param currentFontSize - The current font size
 * @param updateType - The type of change, either increment or decrement
 * @returns the next font size
 */
export const calculateNextFontSize = (
  currentFontSize: number,
  updateType: updateFontSizeType | null,
) => {
  if (!updateType) {
    return currentFontSize
  }

  let updatedFontSize: number = currentFontSize
  switch (updateType) {
    case updateFontSizeType.decrement:
      switch (true) {
        case currentFontSize > MAX_ALLOWED_FONT_SIZE:
          updatedFontSize = MAX_ALLOWED_FONT_SIZE
          break
        case currentFontSize >= 48:
          updatedFontSize -= 12
          break
        case currentFontSize >= 24:
          updatedFontSize -= 4
          break
        case currentFontSize >= 14:
          updatedFontSize -= 2
          break
        case currentFontSize >= 9:
          updatedFontSize -= 1
          break
        default:
          updatedFontSize = MIN_ALLOWED_FONT_SIZE
          break
      }
      break

    case updateFontSizeType.increment:
      switch (true) {
        case currentFontSize < MIN_ALLOWED_FONT_SIZE:
          updatedFontSize = MIN_ALLOWED_FONT_SIZE
          break
        case currentFontSize < 12:
          updatedFontSize += 1
          break
        case currentFontSize < 20:
          updatedFontSize += 2
          break
        case currentFontSize < 36:
          updatedFontSize += 4
          break
        case currentFontSize <= 60:
          updatedFontSize += 12
          break
        default:
          updatedFontSize = MAX_ALLOWED_FONT_SIZE
          break
      }
      break

    default:
      break
  }

  return updatedFontSize
}
