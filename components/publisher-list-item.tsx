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
  Spinner,
} from '@chakra-ui/react';
import { PublisherArticlesCountBadge, PublisherRespectBadge } from './badges';
import { ConnectedShowAddress } from './react'
import { StarIcon, EditIcon, CalendarIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useWallet } from "@cosmos-kit/react"
import { clearPublisherFromLocalStorage, getPublisherData } from './services';
import { PublisherPayRespectModal } from './publisher-pay-respect-modal';
import {PublisherSDKType} from "@bze/bzejs/bze/cointrunk/store";
import BigNumber from 'bignumber.js';


export const PublisherListItem = ({name, address, active, articles_count, created_at, respect }: PublisherSDKType) => {
  const [respectLoading, setRespectLoading] = useState(false);
  const [loadedRespect, setLoadedRespect] = useState(respect);
  const [showRespectModal, setShowRespectModal ] = useState(false);
  const { isWalletConnected, connect } = useWallet();
  
  const refreshRespect = async () => {
    clearPublisherFromLocalStorage(address);
    const publisherData = await getPublisherData(address);
    if (publisherData !== undefined) {
      setLoadedRespect(publisherData.respect);
    }
  }

  const onSubmitRespectSuccess = async () => {
    setRespectLoading(true)
    await refreshRespect();
    setRespectLoading(false)
    
    //let it try again in 10 seconds in case previous call returned old value 
    setTimeout(() => {
      refreshRespect();
    }, 10000)
  }

  const onSubmitRespectModalClose = () => {
    setShowRespectModal(false);
  }

  const onPayRespectButtonClick = () => {
    if (!isWalletConnected) {
      connect();
      return;
    }

    setShowRespectModal(true);
  }

  return (
    <>
      <PublisherPayRespectModal
        publisherName={name}
        publisherAddress={address}
        showModal={showRespectModal}
        onSubmitSuccess={onSubmitRespectSuccess}
        onModalClose={onSubmitRespectModalClose}
      />
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
                <StatNumber>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit',}).format((new BigNumber(created_at)).toNumber() * 1000) }</StatNumber>
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
                <StatNumber>{respectLoading ? (<Spinner size='xs' />) : Intl.NumberFormat('en', { notation: 'standard' }).format((new BigNumber(loadedRespect)).div(1000000).toNumber())}</StatNumber>
              </Stat>
            </Box>
          </Flex>
          <Flex p={1}>
            <Box p={4}>
              <PublisherRespectBadge respect={new BigNumber(loadedRespect)}/>
              <PublisherArticlesCountBadge articlesCount={articles_count}/>
            </Box>
            <Spacer />
            {active && 
              <Box p='4'>
                <Button rightIcon={<StarIcon />} colorScheme='grey' variant='outline' size='xs' onClick={onPayRespectButtonClick}>
                  Pay Respect
                </Button>
              </Box>
            }
          </Flex>
        </Flex>
      </Stack>
    </>
    );
  };