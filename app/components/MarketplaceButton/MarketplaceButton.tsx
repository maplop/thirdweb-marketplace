import { MARKETPLACE_ADDRESS } from "@/const/address"
import { Web3Button } from "@thirdweb-dev/react"

interface MarketplaceButtonProps {
  children: React.ReactNode
  action: () => void,
  onSuccess?: () => void,
  onError?: () => void,
  onSubmit?: () => void,
  className?: string
}

const MarketplaceButton: React.FC<MarketplaceButtonProps> = ({
  children,
  action,
  onSuccess,
  onError,
  onSubmit,
  className
}) => {
  return (
    <Web3Button
      contractAddress={MARKETPLACE_ADDRESS}
      action={action}
      onSuccess={onSuccess}
      onSubmit={onSubmit}
      onError={onError}
      style={{ width: '100%' }}
    >
      {children}
    </Web3Button>
  )
}
export default MarketplaceButton
