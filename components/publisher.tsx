
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
import { PublisherProps } from './types';
import { ConnectedShowAddress } from './react'
import { StarIcon, EditIcon, CalendarIcon } from '@chakra-ui/icons';

export const Publisher = ({name, address, active, articles_count, created_at, respect }: PublisherProps) => {
  const calculateRespectBadge = () => {
    const intRespect = parseInt(respect)
    if (intRespect < 10000000000) {
      return ''
    }
    let badgeColor = 'yellow'
    let badgeText = 'respected'
    if (intRespect > 100000000000) {
      badgeColor = 'teal'
      badgeText = 'highly respected'
    }

    return (<Badge variant='solid' ml={1} colorScheme={badgeColor}>{badgeText}</Badge>)
  }

  const calculateArticlesCountBadge = () => {
    let badgeColor = 'gray'
    let badgeText = 'beginner'

    switch (true) {
      case articles_count >= 100:
        badgeColor = 'green'
        badgeText = '100 articles'
        break;
      case articles_count >= 50:
        badgeColor = 'orange'
        badgeText = '50 articles'
        break;
      case articles_count >= 10:
        badgeColor = 'yellow'
        badgeText = '10 articles'
        break;
    }

    return (<Badge variant='solid' ml={1} colorScheme={badgeColor}>{badgeText}</Badge>)
  }

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
                  <StatLabel>Since <CalendarIcon/></StatLabel>
                  <StatNumber>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit',}).format(parseInt(created_at) * 1000) }</StatNumber>
                </Stat>
              </Box>
              <Spacer />
              <Box p='4' >
                <Stat>
                    <StatLabel>Articles <EditIcon/></StatLabel>
                    <StatNumber>{articles_count}</StatNumber>
                </Stat>
              </Box>
              <Spacer />
              <Box p='4'>
                <Stat>
                  <StatLabel>Respect <StarIcon /></StatLabel>
                  <StatNumber>{Intl.NumberFormat('en', { notation: 'compact' }).format(parseInt(respect) / 1000000)}</StatNumber>
                </Stat>
              </Box>
            </Flex>
            <Flex p={1}>
              <Box p={4}>
                {active && (calculateRespectBadge())}
                {active && (calculateArticlesCountBadge())}
              </Box>
              <Spacer />
              <Box p='4'>
              <Button rightIcon={<StarIcon />} colorScheme='grey' variant='outline' size='xs'>
                Pay Respect
              </Button>
              </Box>
            </Flex>
          </Flex>
      </Stack>
    );
  };