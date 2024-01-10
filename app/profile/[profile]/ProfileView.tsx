'use client'
import { Box, Typography, styled, useTheme } from "@mui/material"
import { useParams } from "next/navigation"
import ContentPage from "@/app/components/ContentPage/ContentPage"
import { formatAddress } from "@/utils/formatAddress"
import FileCopyIcon from '@mui/icons-material/FileCopy';
import NFTList from "@/app/components/NFTList/NFTList"
import { useContract, useOwnedNFTs } from "@thirdweb-dev/react"
import { NFT_COLLECTION_ADDRESS } from "@/const/address"
import { NftURLParams } from "@/types/types"
import { FilterOptions } from "@/app/buy/useBuyView"

const ProfileView: React.FC = () => {

  const { profile } = useParams<NftURLParams>()
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data: nfts, isLoading: loadingNFTs } = useOwnedNFTs(contract, profile);

  return (
    <ContentPage>
      <Cover>
        <Avatar />
      </Cover>
      <AccountContainer>
        <AccountAddress>{formatAddress(profile as string)}</AccountAddress>
        <CopyIcon />
      </AccountContainer>
      <Title variant="h5">NFTs Collection</Title>
      <NFTContainer>
        <NFTList allNfts={nfts} loadingAllNfts={loadingNFTs} emptyText="no hay nfts" filterSelected={FilterOptions.ALL} />
      </NFTContainer>
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

