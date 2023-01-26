
import {
    Box,
    Divider,
    Grid,
    Container,
    Flex,
    Spinner,
  } from '@chakra-ui/react';
import { PageTitleProps, PublisherListItem, TitleBox } from '../../components';
import { infoGrid } from '../../config';
import NextHead from '../../components/next-head';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { InfoGrid } from '../../components/info-grid';
import { useEffect, useState } from 'react';
import { Publisher } from '@bze/bzejs/types/codegen/beezee/cointrunk/publisher';
import { getPublisherData } from '../../components/services';

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
    const [isLoading, setLoading] = useState(true)
    const [publisherDetails, setPublisherDetails] = useState<Publisher|null>(null)
    
    useEffect(() => {
        if (typeof address === 'string') {
            getPublisherData(address)
                .then((publisher) => {
                    setPublisherDetails(publisher ?? null)
                    setLoading(false)
                    pageTitleBox.subTitleHighlighted = publisher?.name ?? ''
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
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
                isLoading ?
                    (<Flex justifyContent={'center'}><Spinner size='xl' /></Flex>) : 
                publisherDetails !== null ?
                    (<PublisherListItem key={publisherDetails.address} {...publisherDetails}></PublisherListItem>) :
                    (<Flex justifyContent={'center'} fontSize={26}>Publisher with address: {address} not found!</Flex>)
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
  