import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Flex,
  Link as UiLink,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  Badge,
  Heading,
  Spinner,
} from '@chakra-ui/react';
import { stringTruncateFromCenter } from './react';
import { ArticleSDKType } from '@bze/bzejs/types/codegen/beezee/cointrunk/article';
import { PublisherSDKType } from '@bze/bzejs/types/codegen/beezee/cointrunk/publisher';
import { useState, useEffect } from 'react';
import { respectBadgeParams, ArticleContentBadge, ArticleJustPublished } from './badges';
import Long from "long";
import { getExplorerBaseUrl } from '../config';
import { getPublisherData } from './services';
import Link from 'next/link';

export const ArticleListItem = ({id, title, url, picture, publisher, paid, created_at }: ArticleSDKType) => {
  const [isLoading, setLoading] = useState(true)
  const [publisherDetails, setPublisherDetails] = useState<PublisherSDKType|null>(null)
  const [localRespectBadgeParams, setLocalRespectBadgeParams] = useState<{text: string, color: string}|null>(null)
  useEffect(() => {
    if (paid) {
      setLoading(false);
    } else {
      getPublisherData(publisher)
        .then((publisher) => {
            setPublisherDetails(publisher ?? null);
            setLocalRespectBadgeParams(publisher ? respectBadgeParams({respect: publisher.respect}) : null);
            setLoading(false);
          }
        )
    }
  }, [publisher, paid])

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
              <UiLink href={url} target="_blank" _hover={{ textDecoration: 'none' }}>
                <Avatar size='2xl' name='Coin Trunk' src={picture.length > 0 ? picture : '/cointrunk.svg'} bg={'#cceeff'} />
              </UiLink>
            </Box>
          </Flex>
          <Flex padding={2} justifyContent={'center'} direction={{base: 'column'}} flex={'100%'}>
            <Flex p={2}>
              <UiLink href={url} target="_blank" _hover={{ textDecoration: 'none' }}>
                <Heading fontSize={{base: '18px', md: '22px'}}> #{Long.fromValue(id).toInt()}.{' '}{title}{' '}<ExternalLinkIcon mx='1px'/></Heading>
              </UiLink>
            </Flex>
            <Flex p={2} wrap={'wrap'} m={1}>
              <ArticleJustPublished createdAt={created_at} />
              <ArticleContentBadge url={url} />
              {localRespectBadgeParams && (<Badge px='2' m={{base: 1}} colorScheme={localRespectBadgeParams.color}>{localRespectBadgeParams.text}</Badge>)}
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
                  {new Intl.DateTimeFormat
                    (
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: false,
                      }
                    ).format(Long.fromValue(created_at).toInt() * 1000)
                  }
                  {' '}&bull;{' '}
                  {isLoading ?
                    (<Spinner as='span' size='sm'/>) :
                    publisherDetails?.address ? 
                    (<Link href={'/publisher/' + publisherDetails?.address}>{publisherDetails?.name}</Link>) :
                    (<Link target={'_blank'} href={getExplorerBaseUrl() + '/account/' + publisher}>{stringTruncateFromCenter(publisher, 14)}</Link>)
                  }
                </Text>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Stack>
  );
};