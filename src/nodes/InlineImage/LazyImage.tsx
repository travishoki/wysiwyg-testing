import React from "react"
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
  position: Position
  src: string
  width: "inherit" | number
}

export const LazyImage = ({
  altText,
  className,
  height,
  imageRef,
  position,
  src,
  width,
}: InlineImageComponentLazyImageProps) => {
  useSuspenseImage(src)

  return (
    <img
      alt={altText}
      className={className || undefined}
      data-position={position}
      draggable="false"
      ref={imageRef}
      src={src}
      style={{
        display: "block",
        height,
        width,
      }}
    />
  )
}
