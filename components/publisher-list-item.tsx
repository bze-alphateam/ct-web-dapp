
import {
  Box,
  Button,
  Flex,
  Stack,
  Spacer,
  useColorModeValue,
  Badge,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { PublisherArticlesCountBadge, PublisherRespectBadge } from './badges';
import { ConnectedShowAddress } from './react'
import { StarIcon, EditIcon, CalendarIcon } from '@chakra-ui/icons';
import { PublisherSDKType } from '@bze/bzejs/types/codegen/beezee/cointrunk/publisher';
import Long from 'long';

export const PublisherListItem = ({name, address, active, articles_count, created_at, respect }: PublisherSDKType) => {

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
          <Flex p={1} direction={{base:'column', md: 'column'}} flex={'100%'}>
            <Flex direction={{base:'column', md: 'row'}} p={1}>
              <Box
                p={2}
                fontWeight='bold'
                lineHeight='tight'
                noOfLines={1}
              >
                <Heading 
                  fontSize={{base: '18px', md: '22px'}}
                  as='h2'
                  >
                    {name}{' '}
                    <Badge variant='subtle' borderRadius='full' colorScheme={active ? 'green' : 'red'}>{active ? 'active' : 'inactive'}</Badge>
                  </Heading>
              </Box>
              <Spacer/>
              <Box p={2}>
                <ConnectedShowAddress address={address} maxDisplayLength={24}/>
              </Box>
            </Flex>
            <Flex p={1} direction={{base: 'column', md: 'row'}} borderWidth={'thin'} borderRadius={5}>
              <Box p={4}>
                <Stat>
                  <StatLabel>Since <CalendarIcon mb={1}/></StatLabel>
                  <StatNumber>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit',}).format(Long.fromValue(created_at).toInt() * 1000) }</StatNumber>
                </Stat>
              </Box>
              <Spacer />
              <Box p='4' >
                <Stat>
                    <StatLabel>Articles <EditIcon mb={1}/></StatLabel>
                    <StatNumber>{articles_count}</StatNumber>
                </Stat>
              </Box>
              <Spacer />
              <Box p='4'>
                <Stat>
                  <StatLabel>Respect <StarIcon mb={1}/></StatLabel>
                  <StatNumber>{Intl.NumberFormat('en', { notation: 'compact' }).format(Long.fromValue(respect).div(1000000).toInt())}</StatNumber>
                </Stat>
              </Box>
            </Flex>
            <Flex p={1}>
              <Box p={4}>
                <PublisherRespectBadge respect={respect}/>
                <PublisherArticlesCountBadge articlesCount={articles_count}/>
              </Box>
              <Spacer />
              {active && 
                <Box p='4'>
                  <Button rightIcon={<StarIcon />} colorScheme='grey' variant='outline' size='xs'>
                    Pay Respect
                  </Button>
                </Box>
              }
            </Flex>
          </Flex>
      </Stack>
    );
  };