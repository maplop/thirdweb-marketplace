import { SellModalProvider } from "@/providers/SellModalProvider"
import NFTDetailsView from "./NFTDetailsView"


const NFTDetailsPage: React.FC = () => {
  return (
    <SellModalProvider>
      <NFTDetailsView />
    </SellModalProvider>
  )
}
export default NFTDetailsPage
