'use client'
import { Box, Typography, styled, useTheme } from "@mui/material"
import ContentPage from "@/app/components/ContentPage/ContentPage"
import { formatAddress } from "@/utils/formatAddress"
import FileCopyIcon from '@mui/icons-material/FileCopy';
import NFTList from "@/app/components/NFTList/NFTList"
import { FilterOptions } from "@/app/buy/useBuyView"
import useProfile from "./useProfile"
import CustomLink from "@/app/components/CustomLink/CustomLink"
import { routes } from "@/routes"
import NFTsNotFounds from "@/app/components/NFTsNotFound/NFTsNotFound";

const ProfileView: React.FC = () => {

  const theme = useTheme()

  const { address, nfts, loadingNFTs } = useProfile()

  return (
    <ContentPage>
      <Cover>
        <Avatar />
      </Cover>

      {address ? (
        <>
          <AccountContainer>
            <AccountAddress>{formatAddress(address as string)}</AccountAddress>
            <CopyIcon />
          </AccountContainer>
          <Title variant="h5">Owned NFTs</Title>
          <NFTContainer>
            <NFTList
              allNfts={nfts}
              loadingAllNfts={loadingNFTs}
              emptyText={
                <span>
                  Your collection is empty. Explore and{' '}
                  <CustomLink href={routes.buy}><span style={{ color: theme.palette.secondary.contrastText, textDecoration: 'underline' }}>buy</span></CustomLink> your first NFTs!
                </span>
              }
              filterSelected={FilterOptions.ALL}
            />
          </NFTContainer>
        </>
      ) : (
        <NFTsNotFounds emptyText="Please connect your wallet to explore and manage your NFTs" />
      )}
    </ContentPage >
  )
}
export default ProfileView

const Cover = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100px',
  backgroundColor: theme.palette.secondary.light,
  borderRadius: '10px',

  [theme.breakpoints.up('sm')]: {
    height: '150px',
  }
}))

const Avatar = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: 32,
  bottom: -32,
  width: '58px',
  height: '58px',
  borderRadius: '50%',
  background: 'linear-gradient(to right, #009fff, #ec2f4b)',

  [theme.breakpoints.up('sm')]: {
    width: '84px',
    height: '84px',
    left: 48,
  }
}))

const AccountContainer = styled(Box)(({ }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '8px',
  marginTop: '8px'
}))

const AccountAddress = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 600,
  color: theme.palette.secondary.main,

  [theme.breakpoints.up('sm')]: {
    fontSize: '24px',
  }
}))

const CopyIcon = styled(FileCopyIcon)(({ theme }) => ({
  color: theme.palette.secondary.main,
  height: '18px',

  [theme.breakpoints.up('sm')]: {
    height: '24px',
  }
}))

const NFTContainer = styled(Box)(({ }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  margin: '16px 0'
}))
