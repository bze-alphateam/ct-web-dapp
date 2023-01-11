import {
  Box,
  Divider,
  Grid,
  Heading,
  Text,
  Container,
  useColorModeValue
} from '@chakra-ui/react';
import { Article, Dependency, TitleBox, PageTitleProps } from '../components';
import { dependencies, articles } from '../config';
import Navbar from '../components/navbar';
import NextHead from '../components/next-head';
import Footer from '../components/footer';

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
      <Grid templateColumns={{ md: '1fr 1fr' }} gap={8} mb={20}>
        {dependencies.map((dependency) => (
          <Dependency key={dependency.title} {...dependency}></Dependency>
        ))}
      </Grid>
      <Box mb={3}>
        <Divider />
      </Box>
      <Footer/>
    </Container>
  );
}
