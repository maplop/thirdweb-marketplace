'use client'

import { AppBar, Box, Container, Tooltip, Typography, styled } from "@mui/material"
import { ConnectWallet, useAddress } from "@thirdweb-dev/react"
import { AccountCircle } from "@mui/icons-material"
import { routes } from "@/routes"
import MenuIcon from '@mui/icons-material/Menu';
import CustomImage from "../CustomImage/CustomImage"
import CustomLink from "../CustomLink/CustomLink"
import Link from "next/link"

const Navbar: React.FC = () => {
  const address = useAddress()

  return (
    <Nav position="sticky">
      <Wrapper maxWidth='md'>
        <NameMenuWrapper>
          <CustomLink href={'/'}>
            <NameWrapper >
              <WebsiteName>ArtBitX</WebsiteName>
            </NameWrapper>
          </CustomLink>
          <MenuButton />
        </NameMenuWrapper>
        <Menu>
          <MenuItem href={routes.buy}>
            BUY
          </MenuItem>
          <MenuItem href={routes.sell}>
            SELL
          </MenuItem>
        </Menu>
        <ProfileWrapper>
          <ConnectBtn modalSize="compact" />
          {address &&
            <Tooltip title="View profile" placement="right">
              <Box>
                <CustomLink href={routes.profile(address)} >
                  <AccountCircle sx={{ width: '42px', height: '42px' }} />
                </CustomLink>
              </Box>
            </Tooltip>
          }
        </ProfileWrapper>
      </Wrapper>
    </Nav>
  )
}
export default Navbar

const Nav = styled(AppBar)(({ theme }) => ({
  background: theme.palette.info.main,
  borderBottom: `1px solid ${theme.palette.secondary.light}`,
  padding: '8px 0'
}))

const Wrapper = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

}))

const NameMenuWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
}))

const NameWrapper = styled(Box)(({ theme }) => ({

  display: 'none',

  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    padding: '6px 12px',
    backgroundColor: theme.palette.primary.main,
    textDecoration: 'underline',
  }
}))

const MenuButton = styled(MenuIcon)(({ theme }) => ({

  width: '38px',
  height: '52px',
  cursor: 'pointer',

  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}))

const Menu = styled(Box)(({ theme }) => ({

  display: 'none',

  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }
}))

const MenuItem = styled(Link)(({ theme }) => ({
  display: 'block',
  padding: '8px 16px',
  textDecoration: 'none',
  color: theme.palette.secondary.main,
  borderRadius: '5px',
  transition: 'all 0.3s ease-in-out',

  ':hover': {
    backgroundColor: theme.palette.primary.light
  }
}))

const ProfileWrapper = styled(Box)(({ }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
}))

const ConnectBtn = styled(ConnectWallet)(({ theme }) => ({
  height: '48px',
  borderStyle: 'none',
  background: theme.palette.primary.dark,

  ':hover': {
    background: theme.palette.primary.dark,
  }
}))

const WebsiteName = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 600,
  margin: 0,
  padding: 0,
}))
