'use client'
import { Box, styled } from "@mui/material"
import CustomSkeleton from "../CustomSkeleton/CustomSkeleton"

const SkeletonNFTCard: React.FC = () => {
  return (
    <SkeletonContainer>
      <CustomSkeleton height={200} />
      <CustomSkeleton height={50} />
    </SkeletonContainer >
  )
}
export default SkeletonNFTCard

const SkeletonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: '10px',
  padding: '6px',
  boxShadow: `${theme.palette.secondary.dark} 0px 1px 4px`,
}))
