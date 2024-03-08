import { NFT_COLLECTION_ADDRESS } from "@/const/address";
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";

const useProfile = () => {
  const address = useAddress();

  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data: nfts, isLoading: loadingNFTs } = useOwnedNFTs(
    contract,
    address
  );

  return {
    address,
    nfts,
    loadingNFTs,
  };
};
export default useProfile;
