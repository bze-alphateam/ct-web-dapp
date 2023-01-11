import {
  Box,
  Divider,
  Grid,
  Container,
} from '@chakra-ui/react';
import { Article, TitleBox, PageTitleProps } from '../components';
import { infoGrid, articles } from '../config';
import Navbar from '../components/navbar';
import NextHead from '../components/next-head';
import Footer from '../components/footer';
import { InfoGrid } from '../components/info-grid';

const pageTitleBox: PageTitleProps = {
  title: 'Articles',
  subTitle: 'View latest',
  subTitleHighlighted: 'CoinTrunk articles'
}

export default function Home() {
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
        {articles.map((article) => (
          <Article key={article.title} {...article}></Article>
        ))}
      </Grid>
      <InfoGrid key='info-art' info={infoGrid}></InfoGrid>
      <Box mb={3}>
        <Divider />
      </Box>
      <Footer/>
    </Container>
  );
}
