import * as React from "react"
import { Position } from "./InlineImageNode"

const imageCache = new Set()

const useSuspenseImage = (src: string) => {
  if (!imageCache.has(src)) {
    throw new Promise((resolve) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        imageCache.add(src)
        resolve(null)
      }
    })
  }
}

type InlineImageComponentLazyImageProps = {
  altText: string
  className: string | null
  height: "inherit" | number
  imageRef: { current: null | HTMLImageElement }
  src: string
  width: "inherit" | number
  position: Position
}

export const LazyImage = ({
  altText,
  className,
  imageRef,
  src,
  width,
  height,
  position,
}: InlineImageComponentLazyImageProps) => {
  useSuspenseImage(src)

  return (
    <img
      className={className || undefined}
      src={src}
      alt={altText}
      ref={imageRef}
      data-position={position}
      style={{
        display: "block",
        height,
        width,
      }}
      draggable="false"
    />
  )
}
