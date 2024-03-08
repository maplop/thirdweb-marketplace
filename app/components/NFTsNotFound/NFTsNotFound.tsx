'use client'
import { Box, Typography, styled } from "@mui/material"
import { ReactNode } from "react"

interface NFTsNotFoundsProps {
  emptyText?: string | ReactNode
}

const NFTsNotFounds: React.FC<NFTsNotFoundsProps> = ({ emptyText = "NFTs not found" }) => {
  return (
    <Wrapper>
      <EmptyText>
        {emptyText}
      </EmptyText>
    </Wrapper>
  )
}
export default NFTsNotFounds

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '50vh',
}))

const EmptyText = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: '20px'
}))
