import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Flex,
  Link,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  Badge,
  Heading,
} from '@chakra-ui/react';
import { ArticleProps } from './types';

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
            color: useColorModeValue('#0aa4d2', '#48d5ff'),
            boxShadow: useColorModeValue(
              '0 2px 5px #0aa4d2',
              '0 0 3px rgb(72 213 255), 0 3px 8px -2px rgb(121 216 244)'
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
                  <Heading fontSize={{base: '18px', md: '22px'}}> #{id}.{' '}{title}{' '}<ExternalLinkIcon mx='1px'/></Heading>
                </Link>
              </Flex>
              <Flex p={2} wrap={'wrap'} m={1}>
                <Badge borderRadius='full' px='2' m={{base: 1}} colorScheme='orange'>just published</Badge>
                <Badge borderRadius='full' px='2' m={{base: 1}} colorScheme='cyan'>medium.com content</Badge>
                <Badge borderRadius='full' px='2' m={{base: 1}} colorScheme='teal'>highly trusted publisher</Badge>
                {
                  paid ? (
                  <Badge borderRadius='full' px='2' m={{base: 1}} colorScheme='red'>
                    Paid Article
                  </Badge>) : ''
                }
              </Flex>
              <Flex direction={{base: 'column', md: 'row'}} fontSize={'sm'} fontWeight={'bold'}  m={1}>
                <Box p='2'/>
                <Spacer/>
                <Box p='2'>
                  <Text align={{md: 'right'}}>
                    {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long',day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: false,}).format(parseInt(created_at) * 1000)}
                    {' by '}
                    <Link href={'#'}>
                      {publisher}
                    </Link>
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Stack>
    );
  };