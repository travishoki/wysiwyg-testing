export const isStartingResize = (target: HTMLElement): boolean => {
  return target.nodeType === 1 && target.hasAttribute("data-table-resize")
}
