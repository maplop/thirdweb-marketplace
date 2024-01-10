'use client'
import { Box, Button, Typography, styled } from "@mui/material"
import ContentPage from "../ContentPage/ContentPage"
import { routes } from "@/routes"
import { useRouter } from "next/navigation"

const HomeView: React.FC = () => {

  const route = useRouter()

  return (
    <ContentPage>
      <HeroContainer>
        <Title>Marketplace</Title>
        <ShopBtn
          variant="contained"
          onClick={() => route.push(routes.buy)}
        >
          Shop NFTs
        </ShopBtn>
      </HeroContainer>
    </ContentPage>
  )
}
export default HomeView

const HeroContainer = styled(Box)(({ }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  height: 'calc(100vh - 118px)',
  backgroundImage: 'linear-gradient(to bottom right, rgba(30, 0, 30, 0.6), rgba(0, 0, 0, 0.6)), url("/images/home.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '10px',
  overflow: 'hidden',
}))

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  textTransform: 'uppercase',
  fontSize: '32px',
  fontWeight: 600,

  [theme.breakpoints.up('md')]: {
    fontSize: '48px',
  }
}))

const ShopBtn = styled(Button)(({ theme }) => ({
  background: theme.palette.secondary.light,
  border: `1px solid ${theme.palette.secondary.dark}`,
  backdropFilter: 'blur(2px)',
  ':hover': {
    background: theme.palette.secondary.dark
  }
}))
