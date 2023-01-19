import {
  Box,
  Divider,
  Grid,
  Container,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { ArticleListItem, TitleBox, PageTitleProps } from '../components';
import { infoGrid } from '../config';
import Navbar from '../components/navbar';
import NextHead from '../components/next-head';
import Footer from '../components/footer';
import { InfoGrid } from '../components/info-grid';
import { bze, Helpers } from '@bze/bzejs';
import { QueryAllArticlesResponse } from '@bze/bzejs/types/codegen/beezee/cointrunk/query';
import { useEffect, useState } from 'react';
import Long from 'long';

const pageTitleBox: PageTitleProps = {
  title: 'Articles',
  subTitle: 'View latest',
  subTitleHighlighted: 'CoinTrunk articles'
}

export default function Home() {
  
  const rpcEndpoint = 'https://testnet-rpc.getbze.com/';
  const createDefaultParams = (): Helpers.PageRequest => {
    return {
      key: new Uint8Array(),
      offset: Long.fromNumber(0),
      limit: Long.fromNumber(200),
      countTotal: false,
      reverse: true
    }
  }
  const [isLoading, setLoading] = useState(true)
  const [articlesListResponse, setArticlesListResponse] = useState<QueryAllArticlesResponse|null>(null)

  useEffect(() => {
    bze.ClientFactory.createRPCQueryClient({rpcEndpoint})
    .then((client) => {
      client.bze.cointrunk.v1.allArticles({pagination: createDefaultParams()})
      .then((res) => {
        setArticlesListResponse(res)
        setLoading(false)
      })
    })
  }, [])

  return (
    <Container maxW="7xl" py={5}>
      <NextHead></NextHead>
      <Navbar current='Articles'></Navbar>
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
            articlesListResponse?.article.map((article, arrIndex) => (
              <ArticleListItem key={arrIndex} {...article}></ArticleListItem>)
            )
          )
        }
      </Grid>
      <InfoGrid key='info-art' info={infoGrid}></InfoGrid>
      <Box mb={3}>
        <Divider />
      </Box>
      <Footer/>
    </Container>
  );
}
