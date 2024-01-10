'use client'
import { Grid, Box, styled } from "@mui/material"
import ContentPage from "@/app/components/ContentPage/ContentPage"
import CustomSkeleton from "@/app/components/CustomSkeleton/CustomSkeleton";

const SkeletonNFTDetailsView: React.FC = () => {

  return (
    <Grid container spacing={2} >
      <Grid item xs={12} md={6}>
        <ImgWrapperSquare>
          <CustomSkeleton height={250} />
        </ImgWrapperSquare>
        <WrapperDescriptionUpSM>
          <CustomSkeleton variant="text" />
          <CustomSkeleton variant="text" />
          <CustomSkeleton variant="text" />
        </WrapperDescriptionUpSM>
      </Grid>
      <Grid item xs={12} md={6}>
        <Wrapper>
          <CustomSkeleton width={100} height={12} />
          <CustomSkeleton width={270} height={16} />
          <OwnerAccountContainer>
            <CustomSkeleton variant="circular" width={32} height={32} />
            <CustomSkeleton width={90} height={12} />
          </OwnerAccountContainer>
          <WrapperDescriptionDownSM>
            <CustomSkeleton variant="text" />
            <CustomSkeleton variant="text" />
            <CustomSkeleton variant="text" />
          </WrapperDescriptionDownSM>
          <Box sx={{ marginTop: '16px' }}>
            <CustomSkeleton width={70} height={12} />
            <TraitsContainer>
              <TraitItem>
                <CustomSkeleton width={60} height={12} />
                <CustomSkeleton width={110} height={16} />
              </TraitItem>
              <TraitItem>
                <CustomSkeleton width={60} height={12} />
                <CustomSkeleton width={110} height={16} />
              </TraitItem>
            </TraitsContainer>
          </Box>
        </Wrapper>
      </Grid>
    </Grid >
  )
}
export default SkeletonNFTDetailsView

const ImgWrapperSquare = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: '10px',
  padding: '8px'
}))

const WrapperDescriptionDownSM = styled(Box)(({ theme }) => ({
  marginTop: '8px',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  }
}))

const WrapperDescriptionUpSM = styled(Box)(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('md')]: {
    display: 'block',
    marginTop: '16px'
  }
}))

const OwnerAccountContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
})

const TraitsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  marginTop: '8px',
}))

const TraitItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
  gap: '4px',
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: '10px',
  padding: '8px'
}))

const Wrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
})
