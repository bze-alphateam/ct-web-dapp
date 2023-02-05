
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
  Spinner,
} from '@chakra-ui/react';
import { PublisherArticlesCountBadge, PublisherRespectBadge } from './badges';
import { ConnectedShowAddress } from './react'
import { StarIcon, EditIcon, CalendarIcon } from '@chakra-ui/icons';
import { PublisherSDKType } from '@bze/bzejs/types/codegen/beezee/cointrunk/publisher';
import Long from 'long';
import { useRef, useState } from 'react';
import { bze } from '@bze/bzejs';
import { useWallet } from "@cosmos-kit/react"
import { getExplorerTxUrl, getRpcUrl, getMinDenom } from '../config';
import { getSigningBzeClient } from '@bze/bzejs';
import { coins } from '@cosmjs/stargate';
import { Dec, IntPretty } from '@keplr-wallet/unit';
import { getAccountBalance } from './services';
import { useToast } from '@chakra-ui/react'
import Link from 'next/link';
import { clearPublisherFromLocalStorage, getPublisherData } from './services';


export const PublisherListItem = ({name, address, active, articles_count, created_at, respect }: PublisherSDKType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submittingForm, setSubmittingForm] = useState(false);
  const [respectLoading, setRespectLoading] = useState(false);
  const [loadedRespect, setLoadedRespect] = useState(respect);
  const initialRef = useRef(null);
  const toast = useToast();
  const { offlineSigner, isWalletConnected, connect, address: walletAddress } = useWallet();
  let amount = new Dec(0);
  
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

  const onAmountChange = (event: any) => {
    let floatAmt = parseFloat(event.target.value);
    if (isNaN(floatAmt)) {
      floatAmt = 0;
    }
    amount = new Dec(floatAmt);
  }

  const onPayRespectButtonClick = () => {    
    return async (e: any) => {
      e.preventDefault();

      if (offlineSigner === undefined || walletAddress === undefined) {
        return;
      }
      setSubmittingForm(true);

      const amountInUbze = amount.mul(new Dec(1000000));
      const paidAmount = new IntPretty(amountInUbze).maxDecimals(0).locale(false).toString()
      const balance = await getAccountBalance(walletAddress);
      if (balance.balance === undefined) {
        setSubmittingForm(false);
        toast({
          title: 'Can not get balance! ',
          status: 'error',
          isClosable: true,
        })
        onClose();
        return;
      }

      if (amountInUbze.gte(new Dec(balance.balance.amount))) {
        setSubmittingForm(false);
        toast({
          title: 'Insufficient funds!',
          status: 'error',
          isClosable: true,
        })
        console.log('paid amount higher than current balance');
        onClose();
        return;
      }

      const signingClient = await getSigningBzeClient({rpcEndpoint: getRpcUrl(), signer: offlineSigner});
      const { payPublisherRespect } = bze.cointrunk.v1.MessageComposer.withTypeUrl;
      const payPublisherRespectMsg = payPublisherRespect({
        creator: walletAddress,
        address: address,
        amount: paidAmount + getMinDenom()
      });

      try {
        const gasEstimated = await signingClient.simulate(walletAddress, [payPublisherRespectMsg], undefined)
        const fee = {
          amount: coins(0, getMinDenom()),
          gas: new IntPretty(new Dec(gasEstimated).mul(new Dec(1.3)))
            .maxDecimals(0)
            .locale(false)
            .toString()
        };
        let txResult = await signingClient.signAndBroadcast(walletAddress, [payPublisherRespectMsg], fee)
        toast({
          title: (<Link href={getExplorerTxUrl(txResult.transactionHash)} target='_blank'>Respects paid! View TX</Link>),
          status: 'success',
          isClosable: true,
        })
        onSubmitRespectSuccess();
      } catch (e) {
        toast({
          title: 'Error: ' + e,
          status: 'error',
          isClosable: true,
        })
      }
      
      setSubmittingForm(false);
      onClose();
    }
  }

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pay your respect to: {name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>BZE Amount</FormLabel>
              <Input disabled={submittingForm} name='amount' type={'number'} ref={initialRef} placeholder='Total BZE you pay' onChange={onAmountChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button disabled={submittingForm} colorScheme='blue' mr={3} onClick={onPayRespectButtonClick()}>
              {submittingForm && (<Spinner size='xs' />)}{' '}Pay
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
                <StatNumber>{respectLoading ? (<Spinner size='xs' />) : Intl.NumberFormat('en', { notation: 'standard' }).format(Long.fromValue(loadedRespect).div(1000000).toInt())}</StatNumber>
              </Stat>
            </Box>
          </Flex>
          <Flex p={1}>
            <Box p={4}>
              <PublisherRespectBadge respect={loadedRespect}/>
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