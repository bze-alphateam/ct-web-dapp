import {
  Box,
  Divider,
  Grid,
  Container,
  Flex,
  Spinner
} from '@chakra-ui/react';
import { PageTitleProps, PublisherListItem, TitleBox, NextHead, Navbar, Footer, InfoGrid } from '../components';
import { infoGrid } from '../config';
import { useEffect, useState } from 'react';
import { getAllPublishers } from '../components/services';
import {QueryPublishersResponseSDKType} from "@bze/bzejs/bze/cointrunk/query";

const pageTitleBox: PageTitleProps = {
  title: 'Publishers',
  subTitle: 'Viewing all',
  subTitleHighlighted: 'CoinTrunk Publishers'
}

export default function Publishers() {  
  const [isLoading, setLoading] = useState(true)
  const [publishersListResponse, setPublishersListResponse] = useState<QueryPublishersResponseSDKType|null>(null)
  
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
      <Navbar current='Publishers' onSubmitArticleSuccess={() => {}}></Navbar>
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
