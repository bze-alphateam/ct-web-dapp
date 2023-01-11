import Head from 'next/head';
import {
  Box,
  Divider,
  Grid,
  Heading,
  Text,
  Stack,
  Container,
  Link,
  Button,
  Flex,
  Spacer,
  Image,
  Icon,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { Dependency, PageTitleProps, Publisher, TitleBox } from '../components';
import { dependencies, publishers } from '../config';
import NextHead from '../components/next-head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const pageTitleBox: PageTitleProps = {
  title: 'Publishers',
  subTitle: 'Viewing all',
  subTitleHighlighted: 'CoinTrunk Publishers'
}

export default function Publishers() {
  const { colorMode, toggleColorMode } = useColorMode();

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
        {publishers.map((publisher) => (
          <Publisher key={publisher.address} {...publisher}></Publisher>
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
