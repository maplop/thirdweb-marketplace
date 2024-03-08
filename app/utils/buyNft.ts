import {
  DirectListingV3,
  EnglishAuction,
  MarketplaceV3,
} from "@thirdweb-dev/react";

export async function buyNft(
  nftAuction?: EnglishAuction[],
  nftDirect?: DirectListingV3[],
  marketplace?: MarketplaceV3
) {
  let txResult;

  if (nftAuction?.[0]) {
    txResult = await marketplace?.englishAuctions.buyoutAuction(
      nftAuction[0].id
    );
  } else if (nftDirect?.[0]) {
    txResult = await marketplace?.directListings.buyFromListing(
      nftDirect[0].id,
      1
    );
  } else {
    throw new Error("No listing found");
  }

  return txResult;
}
