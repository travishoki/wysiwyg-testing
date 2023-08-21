type getMouseInfoProps = {
  codeDOMNode: HTMLElement | null
  isOutside: boolean
}

export const getMouseInfo = (event: MouseEvent): getMouseInfoProps => {
  const target = event.target

  if (target && target instanceof HTMLElement) {
    const codeDOMNode = target.closest<HTMLElement>("code.composer__code")
    const isOutside = !(
      codeDOMNode || target.closest<HTMLElement>("div.composer-code-action-menu-container")
    )

    return { codeDOMNode, isOutside }
  }

  return { codeDOMNode: null, isOutside: true }
}
