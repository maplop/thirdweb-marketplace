import { EnglishAuction, MarketplaceV3 } from "@thirdweb-dev/react";

export async function makeBid(
  nftAuction?: EnglishAuction[],
  marketplace?: MarketplaceV3,
  bidValue?: number
) {
  let txResult;

  if (!bidValue) return;

  if (nftAuction?.[0]) {
    txResult = await marketplace?.englishAuctions.makeBid(
      nftAuction[0].id,
      bidValue
    );
  } else {
    alert("No listing found");
  }
  return txResult;
}
