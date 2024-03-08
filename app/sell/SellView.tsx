'use client'
import { routes } from "@/routes"
import { FilterOptions } from "../buy/useBuyView"
import ContentPage from "../components/ContentPage/ContentPage"
import CustomLink from "../components/CustomLink/CustomLink"
import NFTList from "../components/NFTList/NFTList"
import useProfile from "../profile/[profile]/useProfile"
import { useTheme } from "@mui/material"
import NFTsNotFounds from "../components/NFTsNotFound/NFTsNotFound"

const SellView: React.FC = () => {

  const { nfts, loadingNFTs, address } = useProfile()

  const theme = useTheme()

  return (
    <ContentPage titlePage="Sell NFTs">
      {address ?
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
          showDetails={false}
        />
        :
        <NFTsNotFounds emptyText="Please connect your wallet to explore and manage your NFTs" />
      }

    </ContentPage>
  )
}
export default SellView
