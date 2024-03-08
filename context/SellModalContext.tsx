import { createContext, useContext } from 'react'

type SellModalType = {
  openSellModal: boolean,
  handleOpenSellModal: (nftId?: string) => void
  handleCloseSellModal: () => void
}

const initialValues: SellModalType = {
  openSellModal: false,
  handleOpenSellModal: (nftId?: string) => null,
  handleCloseSellModal: () => null
}

export const SellModalContext = createContext<SellModalType>(initialValues)

export const useSellModalContext = () => {
  return useContext(SellModalContext)
}
