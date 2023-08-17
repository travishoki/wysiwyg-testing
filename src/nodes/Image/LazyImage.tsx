import React from "react"
import { useSuspenseImage } from "./LasyImage.hooks"

type ImageComponentLazyImageProps = {
  altText: string
  className: string | null
  height: "inherit" | number
  imageRef: { current: null | HTMLImageElement }
  maxWidth: number
  src: string
  width: "inherit" | number
}

export const LazyImage = ({
  altText,
  className,
  height,
  imageRef,
  maxWidth,
  src,
  width,
}: ImageComponentLazyImageProps) => {
  useSuspenseImage(src)

  return (
    <img
      alt={altText}
      className={className || undefined}
      draggable="false"
      ref={imageRef}
      src={src}
      style={{
        height,
        maxWidth,
        width,
      }}
    />
  )
}
