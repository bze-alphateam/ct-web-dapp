
import {
    Box,
    Divider,
    Grid,
    Container,
  } from '@chakra-ui/react';
import { PageTitleProps, Publisher, PublisherProps, TitleBox } from '../../components';
import { infoGrid, publishers } from '../../config';
import NextHead from '../../components/next-head';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { InfoGrid } from '../../components/info-grid';

const pageTitleBox: PageTitleProps = {
    title: 'CoinTrunk Publisher',
    subTitle: '',
    subTitleHighlighted: '',
}

export async function getServerSideProps(context: any) {
    const { address } = context.query;
    const found = publishers.find((publisher) => {
        return publisher.address === address
    })

    return {
        props: {publisher: found},
    }
}
  
export default function PublisherPage({publisher}: {publisher: PublisherProps}) {
    pageTitleBox.subTitleHighlighted = publisher.name
    
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
            <Publisher key={publisher.address} {...publisher}></Publisher>
        </Grid>
        <InfoGrid key='info-pub' info={infoGrid}></InfoGrid>
        <Box mb={3}>
            <Divider />
        </Box>
        <Footer/>
        </Container>
    );
}
  