'use client'
import { SellModalContext } from "@/context/SellModalContext"
import { ReactNode, useState } from "react"
import SellModal from "@/app/components/SellModal/SellModal"


interface SellModalProviderProps {
  children: ReactNode
}

export const SellModalProvider: React.FC<SellModalProviderProps> = ({ children }) => {

  const [openSellModal, setOpenSellModal] = useState<boolean>(false)
  const [nftId, setNftId] = useState<string>()

  const handleOpenSellModal = (nftId?: string) => {
    setOpenSellModal(true)
    setNftId(nftId)
  }

  const handleCloseSellModal = () => {
    setOpenSellModal(false)
    setNftId(undefined)
  }

  return (
    <SellModalContext.Provider value={{ openSellModal, handleOpenSellModal, handleCloseSellModal }}>
      {children}
      <SellModal nftId={nftId} />
    </SellModalContext.Provider>
  )
}
