'use client'
import { NFT_COLLECTION_ADDRESS } from "@/const/address";
import { useSellModalContext } from "@/context/SellModalContext";
import { Box, Grid, Modal, Tab, Tabs, styled, useTheme } from "@mui/material"
import { useContract, useNFT } from "@thirdweb-dev/react";
import CustomImage from "../CustomImage/CustomImage";
import { NFTName, SmallText } from "@/app/token/[collection]/[id]/NFTDetailsView";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import DirectFrom from "./DirectForm";
import AuctionFrom from "./AuctionForm";

interface SellModalProps {
  nftId?: string
}

const SellModal: React.FC<SellModalProps> = ({ nftId }) => {

  const theme = useTheme()

  const { openSellModal, handleCloseSellModal } = useSellModalContext()

  const { contract } = useContract(NFT_COLLECTION_ADDRESS)

  const { data: nft, isLoading: loadingNft } = useNFT(contract, nftId)

  const [tabSelected, setTabSelected] = useState<number>(0)

  const handleTabChange = (event: React.SyntheticEvent, newTabSelected: number) => {
    setTabSelected(newTabSelected)
  }

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 1 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  return (
    <Modal
      open={openSellModal}
      onClose={handleCloseSellModal}
      disableAutoFocus={true}
    >
      <ModalContent>
        <CloseModalContainer onClick={handleCloseSellModal}>
          <CloseModal />
        </CloseModalContainer>
        {loadingNft ? <Box>Loading...</Box>
          : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sx={{ marginBottom: { md: '24px' } }} >
                <Wrapper>
                  <ImgContainer>
                    <CustomImage src={nft?.metadata.image ?? ''} />
                  </ImgContainer>
                </Wrapper>
              </Grid>
              <Grid item xs={12} md={6}>
                <SmallText>Token ID: {nft?.metadata.id}</SmallText>
                <NFTName>{nft?.metadata.name}</NFTName>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: theme.palette.secondary.dark }}>
                    <Tabs
                      value={tabSelected}
                      onChange={handleTabChange}
                      textColor="secondary"
                      indicatorColor="secondary"
                    >
                      <TabItem label="Direct" />
                      <TabItem label="Auction" />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={tabSelected} index={0}>
                    <DirectFrom nftId={nftId} />
                  </CustomTabPanel>
                  <CustomTabPanel value={tabSelected} index={1}>
                    <AuctionFrom />
                  </CustomTabPanel>
                </Box>
              </Grid>
            </Grid>
          )}
      </ModalContent>
    </Modal>
  )
}
export default SellModal

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '300px',
  padding: '24px 32px 24px',
  backgroundColor: "#1a1a1a",
  borderRadius: '10px',
  boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px - 2px, rgba(0, 0, 0, 0.3) 0px 3px 7px - 3px',
  border: `1px solid ${theme.palette.secondary.dark}`,

  [theme.breakpoints.up('sm')]: {
    width: '420px',
  },

  [theme.breakpoints.up('md')]: {
    width: '620px',
  }
}))

const Wrapper = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: '10px',
  padding: '8px',

  [theme.breakpoints.up('md')]: {
    height: '100%',
  }

}))

const ImgContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '250px',
  borderRadius: '10px',
  overflow: 'hidden',

  [theme.breakpoints.up('md')]: {
    height: '100%',
  }
}))

const CloseModalContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: -10,
  right: -10,
  width: '32px',
  height: '32px',
  border: `1px solid ${theme.palette.secondary.dark}`,
  borderRadius: '50%',
  backgroundColor: "#1a1a1a",
  cursor: 'pointer',
}))

const CloseModal = styled(CloseIcon)(({ theme }) => ({
  color: theme.palette.secondary.contrastText
}))

const TabItem = styled(Tab)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,

  '&.Mui-selected': {
    color: theme.palette.secondary.main,
  }
}))
