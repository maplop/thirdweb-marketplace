import SellView from "./SellView"
import { SellModalProvider } from "@/providers/SellModalProvider"

const SellPage: React.FC = () => {
  return (
    <SellModalProvider>
      <SellView />
    </SellModalProvider>
  )
}
export default SellPage
