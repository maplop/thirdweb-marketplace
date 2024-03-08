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
        <Content>
          <MainText>Welcome to the future of digital art</MainText>
          <SecondaryText>
            Explore a unique universe of digital art in our NFT marketplace, where each piece tells an authentic and creative story.
          </SecondaryText>
          <ShopBtn
            variant="contained"
            onClick={() => route.push(routes.buy)}
          >
            View NFTs
          </ShopBtn>
        </Content>
      </HeroContainer>
    </ContentPage>
  )
}
export default HomeView

const HeroContainer = styled(Box)(({ }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - 118px)',
  backgroundImage: 'linear-gradient(to bottom right, rgba(30, 0, 30, 0.6), rgba(0, 0, 0, 0.8)), url("/images/home.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '10px',
  overflow: 'hidden',
}))

const Content = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  padding: '16px',
  maxWidth: '350px',
  backdropFilter: 'blur(5px)',
  zIndex: 1,

  [theme.breakpoints.up('sm')]: {
    maxWidth: '420px',
  },

  [theme.breakpoints.up('md')]: {
    maxWidth: '600px',
  }
}))

const MainText = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  textAlign: 'center',
  fontSize: '26px',
  fontWeight: 600,
  lineHeight: '100%',
  textTransform: 'uppercase',

  [theme.breakpoints.up('md')]: {
    fontSize: '48px',
  }
}))

const SecondaryText = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '100%',

  [theme.breakpoints.up('md')]: {
    fontSize: '16px',
  }
}))


const ShopBtn = styled(Button)(({ theme }) => ({
  fontSize: '12px',
  background: theme.palette.secondary.light,
  border: `1px solid ${theme.palette.secondary.dark}`,
  backdropFilter: 'blur(2px)',
  ':hover': {
    background: theme.palette.secondary.dark
  },

  [theme.breakpoints.up('md')]: {
    fontSize: '14px'
  }
}))
