import { LinkIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Link,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  Badge,
  Heading,
} from '@chakra-ui/react';
import { ArticleProps, FeatureProps } from './types';

export const Article = ({id, title, url, picture, publisher, paid, created_at }: ArticleProps) => {
  return (
      <Stack
        h="full"
        minH={36}
        p={2}
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
        <Flex direction={{base: 'column', md: 'row'}} padding={2}>
          <Flex padding={2} justifyContent={'center'}>
            <Box maxW={{base: '150px', md: '180px'}} overflow='hidden'>
              <Link href={url} target="_blank" _hover={{ textDecoration: 'none' }}>
                <Avatar size='2xl' name='Coin Trunk' src={picture} bg={'#cceeff'}/>
              </Link>
            </Box>
          </Flex>
          <Flex padding={2} justifyContent={'center'} direction={{base: 'column'}} flex={'100%'}>
            <Flex p={2}>
              <Link href={url} target="_blank" _hover={{ textDecoration: 'none' }}>
                <Heading fontSize={'24px'}> #{id}.{' '}{title}{' '}<ExternalLinkIcon mx='1px' /></Heading>
              </Link>
            </Flex>
            <Flex p={2} wrap={'wrap'} m={1}>
              <Badge borderRadius='full' px='2' colorScheme='orange'>just published</Badge>
              <Badge borderRadius='full' px='2' colorScheme='cyan'>medium.com content</Badge>
              <Badge borderRadius='full' px='2' colorScheme='yellow'>highly trusted publisher</Badge>
              {
                paid ? (
                <Badge borderRadius='full' px='2' colorScheme='red'>
                  Paid Article
                </Badge>) : ''
              }
            </Flex>
            <Flex direction={{base: 'column', md: 'row'}} fontSize={'sm'} fontWeight={'bold'}  m={1}>
              <Box p='2'>
                  {' Published by '}
                <Link href={'#'} _hover={{ textDecoration: 'none' }}>
                  <Badge borderRadius='full' px='2' colorScheme='blue'>{publisher}</Badge>
                </Link>
              </Box>
              <Spacer/>
              <Box p='2'>
                <Text align={{md: 'right'}}>
                  {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long',day: '2-digit', hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: false,}).format(parseInt(created_at) * 1000)}
                </Text>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Stack>
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
