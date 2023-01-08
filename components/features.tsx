import { LinkIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  Spacer,
  Grid,
  GridItem,
  Stack,
  Text,
  useColorModeValue,
  Badge,
  Image,
  Center,
} from '@chakra-ui/react';
import { create } from 'domain';
import { FeatureProps } from './types';

export const Product = ({id, title, url, picture, publisher, paid, created_at }: FeatureProps) => {
  return (
    <Link href={url} target="_blank" _hover={{ textDecoration: 'none' }}>
      <Stack
        h="full"
        minH={36}
        p={5}
        spacing={2.5}
        justifyContent="center"
        borderRadius={5}
        boxShadow={useColorModeValue(
          '0 2px 5px #ccc',
          '0 1px 3px #727272, 0 2px 12px -2px #2f2f2f'
        )}
        _hover={{
          color: useColorModeValue('purple.600', 'purple.300'),
          boxShadow: useColorModeValue(
            '0 2px 5px #bca5e9',
            '0 0 3px rgba(150, 75, 213, 0.8), 0 3px 8px -2px rgba(175, 89, 246, 0.9)'
          )
        }}
      >
        <Grid
          templateAreas={{
            base: `"image" "title" "body" "footer"`,
            md: `"image title" "image body" "image footer"`,
          }}
          gridTemplateRows={{base: 'fr', md: '50px fr 30px'}}
          gridTemplateColumns={{base: '100%', md: '150px 1fr'}}
          h='100%'
          gap='2'
          fontWeight='bold'
        >
          <GridItem pl='2' area={'image'} >
            <Box>
              <Image src={picture} alt={title} position={'relative'} fallbackSrc='/bze.svg'></Image>
            </Box>
          </GridItem>
          <GridItem pl='2' area={'title'} fontSize={'2xl'}>
            #{id}.{' '}{title}{' '}
            <ExternalLinkIcon mx='1px' />
          <GridItem pl='2' area={'body'}>
            {
              paid ? (
              <Badge borderRadius='full' px='2' colorScheme='red'>
                Paid Article
              </Badge>) : ''
            }
            <Badge borderRadius='full' px='2' colorScheme='orange'>just published</Badge>
            <Badge borderRadius='full' px='2' colorScheme='purple'>medium.com content</Badge>
            <Badge borderRadius='full' px='2' colorScheme='yellow'>highly trusted publisher</Badge>
          
          </GridItem>
          </GridItem>
          <GridItem pl='2' area={'footer'} fontSize={'sm'}>
            <Flex direction={{md: 'row'}}>
              <Text>{' Published by '}
              {
                true ? (<Badge borderRadius='full' px='2' colorScheme='purple'>{publisher}</Badge>) : ''
              }
              </Text>
              <Spacer/>
              <Text align={'right'}>
                {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long',day: '2-digit', hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: false,}).format(parseInt(created_at) * 1000)}
              </Text>
            </Flex>
          </GridItem>
        </Grid>

        {/* <Grid
          templateAreas={`"header header"
                          "nav main"
                          "nav footer"`}
          gridTemplateRows={'50px 1fr 30px'}
          gridTemplateColumns={'150px 1fr'}
          h='100%'
          gap='1'
          // color='blackAlpha.700'
          fontWeight='bold'
        >
          <GridItem pl='2' area={'header'} fontSize={'2xl'}>
          #{id}.{' '}{title}&ensp;&rarr;{' '}
          {
            paid ? (
            <Badge borderRadius='full' px='2' colorScheme='yellow'>
              Paid Article
            </Badge>) : ''
          }
          </GridItem>
          <GridItem pl='2' area={'nav'}>
            <Center>
              <Image src={picture} alt={title} position={'relative'} align={'center'} fallbackSrc='/bze.svg'></Image>
            </Center>
          </GridItem>
          <GridItem pl='2' area={'main'} fontSize={'sm'}>
            <Badge borderRadius='full' px='2' colorScheme='purple'>
                 medium.com content
            </Badge>
            <Text>{' '}Published by{' '}
            {
              true ? (
              <Badge borderRadius='full' px='2' colorScheme='purple'>
                 {publisher}
              </Badge>) : ''
            }
            </Text>
          
          </GridItem>
          <GridItem pl='2' h={'100%'} area={'footer'} fontSize={'sm'}>
          {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long',day: '2-digit', hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: false,}).format(parseInt(created_at) * 1000)}
          </GridItem>
        </Grid> */}

        {/* <Heading fontSize="xl">#{id}.{' '}{title}&ensp;&rarr;{' '}
          {
            paid ? (
            <Badge borderRadius='full' px='2' colorScheme='yellow'>
              Paid Article
            </Badge>) : ''
          }
          {
            true ? (
            <Badge borderRadius='full' px='2' colorScheme='purple'>
              New!
            </Badge>) : ''
          }
          </Heading>
        <Text>{url}</Text>
        <Flex direction='row'>
          <Box p={5} shadow='md' borderWidth='1px' borderRadius='lg'>
            <Heading fontSize={'sm'}>{'Publisher'}</Heading>
            <Text fontSize={'sm'} mt={1}>{publisher}</Text>
          </Box>
          <Spacer/>
          <Box p={5} shadow='md' borderWidth='1px' borderRadius='lg'>
            <Heading fontSize={'sm'}>{'Date'}</Heading>
            <Text fontSize={'sm'} mt={1}>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long',day: '2-digit', hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: false,}).format(parseInt(created_at) * 1000)}</Text>
          </Box>
        </Flex> */}


        {/* <Grid templateColumns='repeat(5, 1fr)' gap={4} fontWeight='bold'>
          <GridItem colSpan={2} h='10'>Published by:{' '}{publisher}</GridItem>
          <GridItem colStart={6} colEnd={8} h='10'>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long',day: '2-digit', hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: false,}).format(parseInt(created_at) * 1000)}</GridItem>
        </Grid> */}
      </Stack>
    </Link>
  );
};

export const Dependency = ({ id, title, url, picture, publisher, paid, created_at }: FeatureProps) => {
  return (
    <Link href={url} target="_blank" _hover={{ textDecoration: 'none' }}>
      <Stack
        isInline={true}
        key={title}
        spacing={3}
        h="full"
        p={4}
        justifyContent="center"
        borderRadius="md"
        border="1px solid"
        borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.100')}
        _hover={{
          boxShadow: useColorModeValue(
            '0 2px 5px #ccc',
            '0 1px 3px #727272, 0 2px 12px -2px #2f2f2f'
          )
        }}
      >
        <Box color={useColorModeValue('primary.500', 'primary.200')}>
          <Icon as={LinkIcon} />
        </Box>
        <Stack spacing={1}>
          <Text fontSize="lg" fontWeight="semibold">
            {title}
          </Text>
          <Text
            lineHeight="short"
            color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
          >
            {url}
          </Text>
        </Stack>
      </Stack>
    </Link>
  );
};
