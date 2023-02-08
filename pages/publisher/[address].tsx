
import {
    Box,
    Divider,
    Grid,
    Container,
    Flex,
    Spinner,
  } from '@chakra-ui/react';
import { PageTitleProps, PublisherListItem, TitleBox, NextHead, Navbar, Footer, InfoGrid } from '../../components';
import { infoGrid } from '../../config';
import { useEffect, useState } from 'react';
import { PublisherSDKType } from '@bze/bzejs/types/codegen/beezee/cointrunk/publisher';
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
    const [publisherDetails, setPublisherDetails] = useState<PublisherSDKType|null>(null)
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
    }, []);
    
    return (
        <Container maxW="7xl" py={5}>
            <NextHead></NextHead>
            <Navbar current='' onSubmitArticleSuccess={() => {}}></Navbar>
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
  