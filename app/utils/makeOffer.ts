import { NFT_COLLECTION_ADDRESS } from "@/const/address";
import { DirectListingV3, MarketplaceV3 } from "@thirdweb-dev/react";

export async function makeOffer(
  nftId?: string,
  nftDirect?: DirectListingV3[],
  marketplace?: MarketplaceV3,
  offerValue?: number
) {
  let txResult;

  if (!offerValue) return;

  if (nftDirect?.[0]) {
    txResult = await marketplace?.offers.makeOffer({
      tokenId: nftId ? nftId : "",
      totalPrice: offerValue,
      assetContractAddress: NFT_COLLECTION_ADDRESS,
    });
  } else {
    alert("No listing found");
  }
  return txResult;
}
