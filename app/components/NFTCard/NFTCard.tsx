import { Box, Typography, styled } from "@mui/material"
import SkeletonNFTCard from "./SkeletonNFTCard"
import { DirectListingV3, EnglishAuction, NFT } from "@thirdweb-dev/sdk"
import Image from "next/image"
import Link from "next/link"
import { MARKETPLACE_ADDRESS, NFT_COLLECTION_ADDRESS } from "@/const/address"
import CustomLink from "../CustomLink/CustomLink"
import CustomImage from "../CustomImage/CustomImage"
import { FilterOptions } from "@/app/buy/useBuyView"
import { useContract, useValidDirectListings, useValidEnglishAuctions } from "@thirdweb-dev/react"
import { useSellModalContext } from "@/context/SellModalContext"

interface NFTCardProps {
  filterSelected: FilterOptions;
  data: NFT | DirectListingV3 | EnglishAuction
  showDetails: boolean
}

const NFTCard: React.FC<NFTCardProps> = ({ filterSelected, data, showDetails }) => {

  const { handleOpenSellModal } = useSellModalContext()

  const isAllSelected = filterSelected === FilterOptions.ALL;

  const getID = () => {
    if (filterSelected === FilterOptions.ALL) {
      return 'metadata' in data ? data?.metadata.id : undefined;
    } else {
      return 'asset' in data ? data?.asset.id : undefined;
    }
  };

  const { contract: marketplace, isLoading: loadingMarketplace } =
    useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: getID(),
    });

  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: getID(),
    });


  const getCardLink = () => {
    const baseLink = `/token/${NFT_COLLECTION_ADDRESS}/${isAllSelected ? getID() : ''}`;

    if (filterSelected !== FilterOptions.ALL) return `${baseLink}/${'asset' in data && data?.asset.id}`;
    return baseLink
  };

  const getImage = () => {
    if (filterSelected === FilterOptions.ALL) {
      return 'metadata' in data ? data?.metadata.image : '';
    } else {
      return 'asset' in data ? data?.asset.image : '';
    }
  };

  const getName = () => {
    if (filterSelected === FilterOptions.ALL) {
      return 'metadata' in data && data?.metadata.name;
    } else {
      return 'asset' in data && data?.asset.name;
    }
  };

  const getText = () => {
    if (filterSelected === FilterOptions.ALL) {
      return `Token ID #${'metadata' in data && data.metadata.id}`;
    } else {
      return `Token ID #${'asset' in data && data?.asset.id}`;
    }
  };

  const getPrice = () => {
    if (directListing && directListing[0]) {
      return (
        <>
          <CardText>Price</CardText>
          <TextValue>
            {`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}
          </TextValue>
        </>
      );
    } else if (auctionListing && auctionListing[0]) {
      return (
        <>
          <CardText>Minimum Bid</CardText>
          <TextValue>
            {`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}
          </TextValue>
        </>
      );
    } else {
      return (
        <>
          <CardText>Price</CardText>
          <TextValue>No for sale</TextValue>
        </>
      );
    }
  };

  const handleOpenModal = () => {
    handleOpenSellModal(getID())
  }

  const commonContent = (
    <CardContainer>
      <CardImgContainer>
        <CustomImage alt={`${getName()}-img`} src={getImage() ?? ''} />
      </CardImgContainer>
      <CardDataContainer>
        <MainDataContainer>
          <NFTName>{getName()}</NFTName>
          <CardText>{getText()}</CardText>
        </MainDataContainer>
        <Box>{getPrice()}</Box>
      </CardDataContainer>
    </CardContainer>
  );

  return (
    <>
      {showDetails ? (
        <CustomLink href={getCardLink()}>
          {commonContent}
        </CustomLink>
      ) : (
        <Box onClick={handleOpenModal}>
          {commonContent}
        </Box>
      )}
    </>
  );
};

export default NFTCard;

const CardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: '10px',
  padding: '6px',
  boxShadow: `${theme.palette.secondary.dark} 0px 1px 4px`,
  cursor: 'pointer'
}))

const CardImgContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  width: '100%',
  height: '200px',
  background: theme.palette.secondary.light,
  borderRadius: '10px',
  overflow: 'hidden',
}))

const CardDataContainer = styled(Box)(({ theme }) => ({
  height: '50px',
  padding: '8px',
  background: theme.palette.secondary.dark,
  borderRadius: '10px'
}))

const MainDataContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
  overflow: 'hidden',
  whiteSpace: 'nowrap'
}))

const CardText = styled(Typography)(({ theme }) => ({
  fontSize: '10px',
  fontWeight: 600,
  color: theme.palette.secondary.contrastText,
  padding: '0px',
  margin: '0px',
}))

const NFTName = styled(CardText)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  color: theme.palette.secondary.main,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
}))

const TextValue = styled(CardText)({
  fontSize: '12px'
})

const SkeletonContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  marginTop: '4px',
})
