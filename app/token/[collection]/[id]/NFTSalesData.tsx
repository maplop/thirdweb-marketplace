import { MARKETPLACE_ADDRESS, NFT_COLLECTION_ADDRESS } from "@/const/address";
import { Box, Button, InputAdornment, TextField, styled } from "@mui/material"
import { NFT, useAddress, useContract, useDirectListing, useEnglishAuction, useOffers, useValidDirectListings, useValidEnglishAuctions } from "@thirdweb-dev/react";
import { SmallText, TraitValue } from "./NFTDetailsView";
import MarketplaceButton from "@/app/components/MarketplaceButton/MarketplaceButton";
import { makeOffer } from "@/app/utils/makeOffer";
import { useState } from "react";
import { buyNft } from "@/app/utils/buyNft";
import { useSellModalContext } from "@/context/SellModalContext";

interface NFTSalesDataProps {
  nft?: NFT
}


const NFTSalesData: React.FC<NFTSalesDataProps> = ({ nft }) => {

  const { handleOpenSellModal } = useSellModalContext()

  const { contract: marketplaceContractV3 } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  )

  const { data: nftDirect, isLoading: loadingNftDirect } = useValidDirectListings(marketplaceContractV3, {
    tokenContract: NFT_COLLECTION_ADDRESS,
    tokenId: nft?.metadata.id,
  });

  const { data: nftAuction, isLoading: loadingNftAuction } = useValidEnglishAuctions(marketplaceContractV3, {
    tokenContract: NFT_COLLECTION_ADDRESS,
    tokenId: nft?.metadata.id,
  });

  const hasListing = nftDirect?.[0] || nftAuction?.[0];

  const auctionId = nftAuction && nftAuction[0] && nftAuction[0].id
  const { data: englishAuction } = useEnglishAuction(marketplaceContractV3, auctionId);
  const { data: directListing } = useDirectListing(marketplaceContractV3, auctionId);

  const owner = (nftAuction && nftAuction[0]) ? englishAuction?.creatorAddress : (nftDirect && nftDirect[0]) ? directListing?.creatorAddress : nft?.owner
  const address = useAddress()
  const isOwner = address === owner;

  const [offerValue, setOfferValue] = useState<number>(0)

  const handleOfferValueOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (value >= 0) {
      setOfferValue(value);
    }
  };

  return (
    <DataContainer>
      {isOwner ? (
        hasListing ? (
          (nftAuction && nftAuction[0]) ? (
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                <BidContainer>
                  <PriceContainer>
                    <SmallText>Minimum Bid</SmallText>
                    <TraitValue>{nftAuction[0].minimumBidCurrencyValue.displayValue} {nftAuction[0].minimumBidCurrencyValue.symbol}</TraitValue>
                  </PriceContainer>
                </BidContainer>
                <BuyOutPriceContainer>
                  <PriceContainer>
                    <SmallText>Buyout Price</SmallText>
                    <TraitValue>{nftAuction[0].buyoutCurrencyValue.displayValue} {nftAuction[0].buyoutCurrencyValue.symbol}</TraitValue>
                  </PriceContainer>
                </BuyOutPriceContainer>
              </Box>
              <MarketplaceButton
                action={() => null}
              //action={() => nftAuction?.[0]?.id && cancelEnglishAuction(nftAuction[0].id)}
              //onError={() => console.log(error)}
              >
                Cancel auction
              </MarketplaceButton>
            </Box>
          ) : (
            < ForSaleContent >
              <PriceContainer>
                <SmallText>Price</SmallText>
                <TraitValue>{nftDirect?.[0]?.currencyValuePerToken.displayValue} {nftDirect?.[0]?.currencyValuePerToken.symbol}</TraitValue>
              </PriceContainer>
              <MarketplaceButton
                action={() => null}
              //action={() => nftDirect?.[0]?.id && cancelListing(nftDirect[0].id)}
              >
                Cancel listing
              </MarketplaceButton>
            </ForSaleContent>
          )
        ) : (
          < ForSaleContent >
            <ListingBtn
              onClick={() => handleOpenSellModal(nft?.metadata.id)}
            >
              List for sale
            </ListingBtn>
          </ForSaleContent >
        )
      ) : (
        (nftAuction && nftAuction[0] ? (
          <>
            <BidContainer>
              <PriceContainer>
                <SmallText>Minimum Bid</SmallText>
                <TraitValue>{nftAuction[0].minimumBidCurrencyValue.displayValue} {nftAuction[0].minimumBidCurrencyValue.symbol}</TraitValue>
              </PriceContainer>
              <FormBidContainer>
                <Box sx={{ flex: 1 }}>
                  <Input
                    variant="outlined"
                    defaultValue={0}
                    //value={bidValue}
                    fullWidth
                    type="number"
                  // onChange={handleOfferValueOnchange}
                  />
                </Box>
                <Box sx={{ flex: 2 }}>
                  <MarketplaceButton
                    action={() => null}
                  /*
                    action={() => createBidOffer(nftId?.toString(),
                      nftAuction,
                      nftDirect,
                      marketplaceContractV3,
                      bidValue
                    )}
                    onSuccess={() => setBidValue(0.0)}
*/
                  >
                    Make bid
                  </MarketplaceButton>
                </Box>
              </FormBidContainer>
            </BidContainer>
            <BuyOutPriceContainer>
              <PriceContainer>
                <SmallText>Buyout Price</SmallText>
                <TraitValue>{nftAuction[0].buyoutCurrencyValue.displayValue} {nftAuction[0].buyoutCurrencyValue.symbol}</TraitValue>
              </PriceContainer>
              <MarketplaceButton
                action={() => null}
              //action={() => buyNft(nftAuction, nftDirect, marketplaceContractV3)}
              >
                Buy NFT
              </MarketplaceButton>
            </BuyOutPriceContainer>
          </>
        ) : (
          <ForSaleContent>
            <PriceContainer>
              <SmallText>Price</SmallText>
              <TraitValue>{nftDirect?.[0].currencyValuePerToken.displayValue} {nftDirect?.[0].currencyValuePerToken.symbol}</TraitValue>
            </PriceContainer>
            <MarketplaceButton
              action={() => buyNft(nftAuction, nftDirect, marketplaceContractV3)}
              onSuccess={() => alert("Transfer successfully completed.")}
              className="btn-details"
            >
              Buy now
            </MarketplaceButton>
            <Input
              value={offerValue}
              onChange={handleOfferValueOnChange}
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="start">{nftDirect?.[0].currencyValuePerToken.symbol.toLocaleUpperCase()}</InputAdornment>,
              }}
            />
            <MarketplaceButton
              action={() => makeOffer(
                nft?.metadata.id,
                nftDirect,
                marketplaceContractV3,
                offerValue
              )}
              onSubmit={() => alert("submit")}
              onSuccess={() => {
                setOfferValue(0)
                alert("Success!!!")
              }}
            >
              Make offer
            </MarketplaceButton>

          </ForSaleContent>
        ))
      )}
    </DataContainer >
  )
}
export default NFTSalesData

const DataContainer = styled(Box)(({ theme }) => ({
  marginTop: '16px'
}))

const ForSaleContent = styled(Box)(({ }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  width: '100%',
}))

const PriceContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  padding: '8px',
  borderRadius: '5px',
}))



const BuyOutPriceContainer = styled(Box)(({ }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
}))

const FormBidContainer = styled(Box)(({ }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
}))

const BidContainer = styled(Box)(({ }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1
}))

const ListingBtn = styled(Button)(({ theme }) => ({
  display: 'flex',
  background: 'white',
  color: "#000",
  //background: theme.palette.isLight
  // ? theme.palette.primaryPalette[40]
  //: theme.palette.dark.primary,
  //color: theme.palette.isLight
  //? theme.palette.primaryPalette[99]
  //: theme.palette.dark.onPrimary,
  borderRadius: 12,
  textTransform: 'none',
  padding: '8px 16px',
  fontSize: 12,

  ':hover': {
    background: 'white',
    color: 'black'
  },
}))

const Input = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: '42px',
    padding: '9px 12px',
    border: `1px solid  ${theme.palette.secondary.light}`,
    borderRadius: '8px',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '100%',
    letterSpacing: '0.1px',
    color: theme.palette.secondary.contrastText,

    '& input': {
      padding: 0,
    },
    '& fieldset': {
      borderStyle: 'none',
    },

    p: {
      color: theme.palette.secondary.dark,
      fontWeight: 600
    },

    '& input[type="number"]': {
      padding: 0,
      '-moz-appearance': 'textfield',
      '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },
  },
}))
