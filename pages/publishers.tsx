import {
  Box,
  Divider,
  Grid,
  Container,
  Flex,
  Spinner
} from '@chakra-ui/react';
import { PageTitleProps, PublisherListItem, TitleBox } from '../components';
import { infoGrid } from '../config';
import NextHead from '../components/next-head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { InfoGrid } from '../components/info-grid';
import { QueryPublisherResponseSDKType } from '@bze/bzejs/types/codegen/beezee/cointrunk/query';
import { useEffect, useState } from 'react';
import { getAllPublishers } from '../components/services';

const pageTitleBox: PageTitleProps = {
  title: 'Publishers',
  subTitle: 'Viewing all',
  subTitleHighlighted: 'CoinTrunk Publishers'
}

export default function Publishers() {  
  const [isLoading, setLoading] = useState(true)
  const [publishersListResponse, setPublishersListResponse] = useState<QueryPublisherResponseSDKType|null>(null)
  
  useEffect(() => {
    getAllPublishers()
    .then((res) => {
      setPublishersListResponse(typeof res === 'undefined' ? null : res);
      setLoading(false);
    })
  }, [])


  return (
    <Container maxW="7xl" py={5}>
      <NextHead></NextHead>
      <Navbar current='Publishers'></Navbar>
      <TitleBox key={pageTitleBox.title} {...pageTitleBox} ></TitleBox>
      <Grid
        templateColumns={{
          md: 'repeat(1, 1fr)',
          lg: 'repeat(1, 1fr)'
        }}
        gap={8}
        mb={14}
        mt={20}
      >
        {
          isLoading ?
          (<Flex justifyContent={'center'}><Spinner size='xl' /></Flex>) : 
          (
            publishersListResponse?.publisher.map((publisher) => (
              <PublisherListItem key={publisher.address} {...publisher}></PublisherListItem>
            ))
          )
        }
      </Grid>
      <InfoGrid key='info-pub' info={infoGrid}></InfoGrid>
      <Box mb={3}>
        <Divider />
      </Box>
      <Footer/>
    </Container>
  );
}
