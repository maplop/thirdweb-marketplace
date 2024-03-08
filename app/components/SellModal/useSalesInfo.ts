import { MARKETPLACE_ADDRESS, NFT_COLLECTION_ADDRESS } from "@/const/address";
import {
  useContract,
  useCreateDirectListing,
  useNFT,
} from "@thirdweb-dev/react";

type DirectListingPayload = {
  nftContractAddress: string;
  tokenId: string;
  price: string;
  startDate: Date;
  endDate: Date;
};

export const useSalesInfo = (nftId?: string) => {
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

  const { data: nft } = useNFT(nftCollection, nftId);
  const { mutateAsync: createDirectListing } =
    useCreateDirectListing(marketplace);

  async function checkAndProvideApproval() {
    const hasApproval = await nftCollection?.call("isApprovedForAll", [
      nft?.owner,
      MARKETPLACE_ADDRESS,
    ]);

    if (!hasApproval) {
      const txResult = await nftCollection?.call("setApprovalForAll", [
        MARKETPLACE_ADDRESS,
        true,
      ]);

      if (txResult) {
        console.log("Approval provided");
      }
    }

    return true;
  }

  async function handleSubmissionDirect(data: DirectListingPayload) {
    await checkAndProvideApproval();
    const txResult = await createDirectListing({
      assetContractAddress: data.nftContractAddress,
      tokenId: data.tokenId,
      pricePerToken: data.price,
      startTimestamp: new Date(data.startDate),
      endTimestamp: new Date(data.endDate),
    });

    return txResult;
  }

  return {
    handleSubmissionDirect,
  };
};
