import { NFT_COLLECTION_ADDRESS, MARKETPLACE_ADDRESS } from "@/const/address";
import {
  useContract,
  useNFTs,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { useState } from "react";

export enum FilterOptions {
  ALL = "all",
  LISTINGS = "listings",
  AUCTIONS = "auctions",
}

const useBuyView = () => {
  const [filterSelected, setFilterSelected] = useState<FilterOptions>(
    FilterOptions.ALL
  );

  const handleFilterSelectedOnChange = (newFilter: FilterOptions) => {
    setFilterSelected(newFilter);
  };

  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { contract: contractV3 } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: allNfts, isLoading: loadingAllNfts } = useNFTs(contract);
  const { data: listings, isLoading: loadingListings } =
    useValidDirectListings(contractV3);
  const { data: auctions, isLoading: loadingAuctions } =
    useValidEnglishAuctions(contractV3);

  return {
    allNfts,
    loadingAllNfts,
    listings,
    loadingListings,
    auctions,
    loadingAuctions,
    filterSelected,
    handleFilterSelectedOnChange,
  };
};
export default useBuyView;
