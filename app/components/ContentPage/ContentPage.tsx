'use client'

import { Box, Container, Typography, styled } from "@mui/material"
import { ReactNode } from "react"

interface ContentPageProps {
  titlePage?: string,
  children: ReactNode
}

const ContentPage: React.FC<ContentPageProps> = ({ titlePage, children }) => {
  return (
    <Wrapper
      maxWidth='md'
      titlePage={titlePage}
    >
      <TitlePage variant="h5">{titlePage}</TitlePage>
      <Box>{children}</Box>
    </Wrapper>
  )
}
export default ContentPage

const Wrapper = styled(Container)<{ titlePage?: string }>(({ titlePage }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: titlePage ? '16px' : '0px',
  paddingTop: '24px',
  paddingBottom: '24px'
}))

const TitlePage = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main
}))
