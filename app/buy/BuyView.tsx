'use client'
import ContentPage from "../components/ContentPage/ContentPage"
import NFTList from "../components/NFTList/NFTList"
import { Box, Button, styled } from "@mui/material"
import useBuyView from "./useBuyView"
import { FilterOptions } from "./useBuyView"

const BuyView: React.FC = () => {

  const { allNfts, loadingAllNfts, listings, loadingListings, auctions, loadingAuctions, filterSelected, handleFilterSelectedOnChange } = useBuyView()

  console.log("### nfts ###")
  console.log(JSON.stringify(allNfts))
  console.log("### listings ###")
  console.log(JSON.stringify(listings))
  console.log("### auctions ###")
  console.log(JSON.stringify(auctions))

  return (
    <ContentPage titlePage="Buy NFTs">
      <NFTFilter>
        <FilterBtn
          variant="contained"
          onClick={() => handleFilterSelectedOnChange(FilterOptions.ALL)}
          active={filterSelected === FilterOptions.ALL}
        >
          All
        </FilterBtn>
        <FilterBtn
          variant="contained"
          onClick={() => handleFilterSelectedOnChange(FilterOptions.LISTINGS)}
          active={filterSelected === FilterOptions.LISTINGS}
        >
          Listings
        </FilterBtn>
        <FilterBtn
          variant="contained"
          onClick={() => handleFilterSelectedOnChange(FilterOptions.AUCTIONS)}
          active={filterSelected === FilterOptions.AUCTIONS}
        >
          Auctions
        </FilterBtn>
      </NFTFilter>
      <NFTList
        allNfts={allNfts}
        loadingAllNfts={loadingAllNfts}
        listings={listings}
        loadingListings={loadingListings}
        auctions={auctions}
        loadingAuctions={loadingAuctions}
        filterSelected={filterSelected}
        emptyText={
          "Looks like there are no NFTs in this collection. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
        }
      />
    </ContentPage>
  )
}
export default BuyView

const NFTFilter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '16px',
}))

const FilterBtn = styled(Button)<{ active?: boolean }>(({ theme, active = false }) => ({
  color: active ? theme.palette.secondary.main : theme.palette.secondary.light,
  backgroundColor: active ? theme.palette.secondary.dark : 'transparent',

  ':hover': {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.dark,
  }
}))
