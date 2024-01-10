'use client'
import { Grid, Typography } from "@mui/material"
import NFTCard from "../NFTCard/NFTCard"
import { DirectListingV3, EnglishAuction, NFT } from "@thirdweb-dev/sdk"
import SkeletonNFTCard from "../NFTCard/SkeletonNFTCard"
import { FilterOptions } from "@/app/buy/useBuyView"

interface NFTListProps {
  allNfts?: NFT[]
  loadingAllNfts?: boolean
  listings?: DirectListingV3[]
  loadingListings?: boolean
  auctions?: EnglishAuction[]
  loadingAuctions?: boolean
  filterSelected: FilterOptions
  emptyText?: string
}

const NFTList: React.FC<NFTListProps> = ({ allNfts, loadingAllNfts, listings, loadingListings, auctions, loadingAuctions, filterSelected, emptyText = "No NFTs found :(" }) => {

  const isLoading = loadingAllNfts || loadingListings || loadingAuctions

  const getData = (filterSelected: FilterOptions) => {
    let data: NFT[] | DirectListingV3[] | EnglishAuction[] | undefined = []

    if (filterSelected === FilterOptions.ALL) {
      data = allNfts
    } else if (filterSelected === FilterOptions.LISTINGS) {
      data = listings
    } else {
      data = auctions
    }
    return data
  }

  const nfts = getData(filterSelected)

  return (
    <Grid container spacing={2}>
      {isLoading ? (
        [...Array(8)].map((_, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
            <SkeletonNFTCard />
          </Grid>
        ))
      ) : (
        nfts && nfts.length > 0 ? (
          nfts.map((nft, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={index}>
              <NFTCard data={nft} filterSelected={filterSelected} />
            </Grid>
          ))
        ) : (
          <Typography>{emptyText}</Typography>
        )
      )
      }
    </Grid>
  )
}
export default NFTList
