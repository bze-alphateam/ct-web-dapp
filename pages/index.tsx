import {
  Box,
  Divider,
  Grid,
  Heading,
  Text,
  Container,
  useColorModeValue
} from '@chakra-ui/react';
import { Article, Dependency } from '../components';
import { dependencies, articles } from '../config';
import Navbar from '../components/navbar';
import NextHead from '../components/next-head';
import Footer from '../components/footer';

export default function Home() {

  return (
    <Container maxW="7xl" py={5}>
      <NextHead></NextHead>
      <Navbar current='Articles'></Navbar>
      <Box textAlign="center">
        <Heading
          as="h1"
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
          fontWeight="extrabold"
          mb={3}
        >
          Articles
        </Heading>
        <Heading
          as="h1"
          fontWeight="bold"
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          <Text as="span">View latest&nbsp;</Text>
          <Text
            as="span"
            color={useColorModeValue('#0aa4d2', '#48d5ff')}
          >
            CoinTrunk articles
          </Text>
        </Heading>
      </Box>
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
