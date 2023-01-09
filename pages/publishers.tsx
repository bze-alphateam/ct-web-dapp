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
import { Dependency, Publisher } from '../components';
import { dependencies, publishers } from '../config';
import NextHead from '../components/next-head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function Publishers() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="7xl" py={5}>
      <NextHead></NextHead>
      <Navbar current='Publishers'></Navbar>
      <Box textAlign="center">
        <Heading
          as="h1"
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
          fontWeight="extrabold"
          mb={3}
        >
          Publishers
        </Heading>
        <Heading
          as="h1"
          fontWeight="bold"
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          <Text as="span">Viewing all&nbsp;</Text>
          <Text
            as="span"
            color={useColorModeValue('#0aa4d2', '#48d5ff')}
          >
            CoinTrunk Publishers
          </Text>
        </Heading>
      </Box>
      {/* <WalletSection /> */}
      <Grid
        templateColumns={{
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)'
        }}
        gap={8}
        mb={14}
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
