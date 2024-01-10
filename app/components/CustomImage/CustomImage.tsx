'use client'

import { styled } from "@mui/material"
import Image from "next/image"

interface CustomImageProps {
  src: string
  alt?: string
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt = 'image' }) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      style={{ objectFit: 'cover', objectPosition: 'center' }}
    />
  )
}
export default CustomImage

const ImageContainer = styled('div')({
  position: 'relative',

})
