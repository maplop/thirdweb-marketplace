'use client'
import { Skeleton, styled } from "@mui/material"

interface CustomSkeletonProps {
  variant?: "text" | "rectangular" | "rounded" | "circular"
  width?: number
  height?: number
}


const CustomSkeleton: React.FC<CustomSkeletonProps> = ({ variant = 'rounded', width, height }) => {
  return (
    <MySkeleton width={width ?? '100%'} height={height} variant={variant} />
  )
}
export default CustomSkeleton

const MySkeleton = styled(Skeleton)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark
}))
