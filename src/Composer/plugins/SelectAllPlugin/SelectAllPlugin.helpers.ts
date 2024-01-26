import { IS_APPLE } from "../../shared/environment"

export function controlOrMeta(metaKey: boolean, ctrlKey: boolean): boolean {
  if (IS_APPLE) {
    return metaKey
  }

  return ctrlKey
}

export function isSelectAll(keyCode: number, metaKey: boolean, ctrlKey: boolean): boolean {
  return keyCode === 65 && controlOrMeta(metaKey, ctrlKey)
}
