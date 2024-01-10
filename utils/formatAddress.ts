export function formatAddress(address: string) {
  const firstPart = address.substring(0, 4);
  const secondPart = address.substring(address.length - 3);
  const shortAddress = firstPart + "..." + secondPart;

  return shortAddress;
}
