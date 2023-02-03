
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { PublisherArticlesCountBadge, PublisherRespectBadge } from './badges';
import { ConnectedShowAddress } from './react'
import { StarIcon, EditIcon, CalendarIcon } from '@chakra-ui/icons';
import { PublisherSDKType } from '@bze/bzejs/types/codegen/beezee/cointrunk/publisher';
import Long from 'long';
import { useRef } from 'react';
import { bze } from '@bze/bzejs';
import { useWallet } from "@cosmos-kit/react"
import { getChainName, getAssets, getRpcUrl, getMinDenom } from '../config';
import { getSigningBzeClient } from '@bze/bzejs';
import { coins } from '@cosmjs/stargate';
import { Dec, IntPretty } from '@keplr-wallet/unit';


export const PublisherListItem = ({name, address, active, articles_count, created_at, respect }: PublisherSDKType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const { offlineSigner, isWalletConnected, connect, address: walletAddress } = useWallet();
  let amount = new Dec(1);
  
  const onAmountChange = (event: any) => {
    // console.log(event.target.value);
    amount = new Dec(event.target.value);
    // console.log(amount.mul(new Dec(1000000)).toString());
  }

  const onPayRespectButtonClick = () => {    
    return async (e: any) => {
      e.preventDefault();
      
      const { payPublisherRespect } = bze.cointrunk.v1.MessageComposer.withTypeUrl;
      const signingClient = await getSigningBzeClient({rpcEndpoint: getRpcUrl(), signer: offlineSigner});

      // console.log(amount);
      const paidAmount = new IntPretty(amount.mul(new Dec(1000000))).maxDecimals(0).locale(false).toString()
      const payPublisherRespectMsg = payPublisherRespect({
        creator: walletAddress,
        address: address,
        amount: paidAmount + getMinDenom()
      });

      // console.log(payPublisherRespectMsg);
      const gasEstimated = await signingClient?.simulate(walletAddress, [payPublisherRespectMsg], undefined)
      const fee = {
        amount: coins(0, getMinDenom()),
        gas: new IntPretty(new Dec(gasEstimated).mul(new Dec(1.3)))
          .maxDecimals(0)
          .locale(false)
          .toString()
      };
      // console.log(fee);
      signingClient.signAndBroadcast(walletAddress, [payPublisherRespectMsg], fee)
    }
  }

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pay your respect to: {name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>BZE Amount</FormLabel>
              <Input name='amount' type={'number'} ref={initialRef} placeholder='Total BZE you pay' onChange={onAmountChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onPayRespectButtonClick()}>
              Pay
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
                <Button rightIcon={<StarIcon />} colorScheme='grey' variant='outline' size='xs' onClick={(e) => isWalletConnected ? onOpen(): connect()}>
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