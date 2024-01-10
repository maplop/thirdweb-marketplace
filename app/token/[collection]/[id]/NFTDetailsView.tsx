'use client'
import { Grid, Typography, Box, styled, useTheme } from "@mui/material"
import ContentPage from "@/app/components/ContentPage/ContentPage"
import { useContract, useNFT, useValidDirectListings, useValidEnglishAuctions } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS, NFT_COLLECTION_ADDRESS } from "@/const/address";
import { useParams } from "next/navigation";
import { NftURLParams } from "@/types/types";
import { AccountCircle } from "@mui/icons-material";
import { routes } from "@/routes";
import { formatAddress } from "@/utils/formatAddress";
import CustomImage from "@/app/components/CustomImage/CustomImage";
import CustomLink from "@/app/components/CustomLink/CustomLink";
import SkeletonNFTDetailsView from "./SkeletonNFTDetailsView";

const NFTDetailsView: React.FC = () => {

  const theme = useTheme()

  const { id: nftId } = useParams<NftURLParams>()

  const { contract: marketplace, isLoading: loadingContract } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  )

  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS)

  const { data: nft, isLoading: loadingNFTs } = useNFT(nftCollection, nftId)

  const { data: directListing, isLoading: loadingDirect } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft?.metadata.id,
    });

  // 2. Load if the NFT is for auction
  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft?.metadata.id,
    });

  return (
    <ContentPage>
      {loadingNFTs
        ?
        <SkeletonNFTDetailsView />
        :
        <Grid container spacing={2} >
          <Grid item xs={12} md={6}>
            <ImgWrapperSquare>
              <ImgContainer>
                <CustomImage alt="nft-img" src={nft?.metadata.image ?? ''} />
              </ImgContainer>
            </ImgWrapperSquare>
            <WrapperDescriptionUpSM>
              <Text>{nft?.metadata.description}</Text>
            </WrapperDescriptionUpSM>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box >
              <SmallText>Token ID: {nft?.metadata.id}</SmallText>
              <NFTName>{nft?.metadata.name}</NFTName>
              <Box sx={{ width: 'fit-content' }}>
                <CustomLink href={routes.profile(nft?.owner ?? '')}>
                  <OwnerAccountContainer>
                    <AccountCircle sx={{ width: '32px', height: '32px', color: theme.palette.secondary.contrastText }} />
                    <OwnerAddress>{formatAddress(nft?.owner ?? '')}</OwnerAddress>
                  </OwnerAccountContainer>
                </CustomLink>
              </Box>
              <WrapperDescriptionDownSM>
                <SmallText>{nft?.metadata.description}</SmallText>
              </WrapperDescriptionDownSM>
              {nft?.metadata.attributes &&
                <Box sx={{ marginTop: '16px' }}>
                  <LabelTraits>Traits</LabelTraits>
                  <TraitsContainer>
                    {Object.entries(nft?.metadata?.attributes || {}).map(
                      ([key, value]) => (
                        <TraitItem key={key} >
                          <SmallText>{value.trait_type}</SmallText>
                          <TraitValue>{value.value}</TraitValue>
                        </TraitItem>
                      )
                    )}
                  </TraitsContainer>
                </Box>
              }
            </Box>
          </Grid>
        </Grid>
      }
    </ContentPage>
  )
}
export default NFTDetailsView

const ImgWrapperSquare = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: '10px',
  padding: '8px'
}))

const ImgContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  width: '100%',
  height: '350px',
  borderRadius: '10px',
  overflow: 'hidden'
}))

const WrapperDescriptionDownSM = styled(Box)(({ theme }) => ({
  marginTop: '8px',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  }
}))

const WrapperDescriptionUpSM = styled(Box)(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('md')]: {
    display: 'block',
    marginTop: '16px'
  }
}))

const Text = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 400,
  color: theme.palette.secondary.contrastText,
  margin: 0,
  padding: 0,
}))

const NFTName = styled(Text)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 600,
  color: theme.palette.secondary.main
}))

const SmallText = styled(Text)(({ }) => ({
  fontWeight: 600,
}))

const OwnerAccountContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
})

const OwnerAddress = styled(Text)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
}))

const LabelTraits = styled(Text)({
  fontSize: '14px',
  fontWeight: 600,
})

const TraitsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  marginTop: '8px',
}))

const TraitItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
  gap: '4px',
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: '10px',
  padding: '8px'
}))

const TraitValue = styled(Text)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'uppercase'
}))
