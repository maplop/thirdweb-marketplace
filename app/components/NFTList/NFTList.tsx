'use client'
import { Grid } from "@mui/material"
import NFTCard from "../NFTCard/NFTCard"
import { DirectListingV3, EnglishAuction, NFT } from "@thirdweb-dev/sdk"
import SkeletonNFTCard from "../NFTCard/SkeletonNFTCard"
import { FilterOptions } from "@/app/buy/useBuyView"
import { ReactNode } from "react"
import NFTsNotFounds from "../NFTsNotFound/NFTsNotFound"

interface NFTListProps {
  allNfts?: NFT[]
  loadingAllNfts?: boolean
  listings?: DirectListingV3[]
  loadingListings?: boolean
  auctions?: EnglishAuction[]
  loadingAuctions?: boolean
  filterSelected: FilterOptions
  emptyText?: string | ReactNode
  showDetails?: boolean
}

const NFTList: React.FC<NFTListProps> = ({ allNfts, loadingAllNfts, listings, loadingListings, auctions, loadingAuctions, filterSelected, showDetails = true, emptyText = "No NFTs found :(" }) => {

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
              <NFTCard data={nft} filterSelected={filterSelected} showDetails={showDetails} />
            </Grid>
          ))
        ) : (
          <NFTsNotFounds emptyText={emptyText} />
        )
      )}
    </Grid>
  )
}
export default NFTList
