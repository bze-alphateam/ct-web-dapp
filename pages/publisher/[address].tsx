
import {
    Box,
    Divider,
    Grid,
    Container,
    Flex,
    Spinner,
  } from '@chakra-ui/react';
import { PageTitleProps, PublisherListItem, PublisherProps, stringTruncateFromCenter, TitleBox } from '../../components';
import { infoGrid, publishers } from '../../config';
import NextHead from '../../components/next-head';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { InfoGrid } from '../../components/info-grid';
import { bze, Helpers } from '@bze/bzejs';
import { QueryPublisherByIndexResponse } from '@bze/bzejs/types/codegen/beezee/cointrunk/query';
import Long from 'long';
import { useEffect, useState } from 'react';
import { Publisher } from '@bze/bzejs/types/codegen/beezee/cointrunk/publisher';
import { useRouter } from 'next/router'

const pageTitleBox: PageTitleProps = {
    title: 'CoinTrunk Publisher',
    subTitle: '',
    subTitleHighlighted: '',
}

export async function getServerSideProps(ctx: any) {
    const { address } = ctx.query;
    return {
      props: {
        address,
      },
    };
  }
  
export default function PublisherPage({address}: {address: string}) {
    const rpcEndpoint = 'https://testnet-rpc.getbze.com/';
    const [isLoading, setLoading] = useState(true)
    const [publisherDetails, setPublisherDetails] = useState<Publisher|null>(null)
    
    useEffect(() => {
        if (typeof address === 'string') {
            bze.ClientFactory.createRPCQueryClient({rpcEndpoint})
            .then((client) => {
                client.bze.cointrunk.v1.publisherByIndex({index: address})
                .then((res) => {
                    setPublisherDetails(res.publisher ?? null)
                    setLoading(false)
                    pageTitleBox.subTitleHighlighted = res.publisher?.name ?? ''
                })
            })
        }
    }, [])
    
    return (
        <Container maxW="7xl" py={5}>
        <NextHead></NextHead>
        <Navbar current='Publishers'></Navbar>
        {!isLoading && <TitleBox key={pageTitleBox.title} {...pageTitleBox} ></TitleBox>}
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
                isLoading || publisherDetails === null ?
                (<Flex justifyContent={'center'}><Spinner size='xl' /></Flex>) : 
                (<PublisherListItem key={publisherDetails.address} {...publisherDetails}></PublisherListItem>)
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
  