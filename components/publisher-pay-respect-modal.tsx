
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Spinner,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
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


export const PublisherPayRespectModal = ({showModal, publisherName, publisherAddress, onSubmitSuccess, onModalClose}: {showModal: boolean, publisherName: string, onSubmitSuccess: () => void, publisherAddress: string, onModalClose: () => void}) => {
    const initialRef = useRef(null);
    const [submittingForm, setSubmittingForm] = useState(false);
    const { offlineSigner, address: walletAddress } = useWallet();
    const toast = useToast();

    let amount = new Dec(0);

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
            onModalClose();
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
            onModalClose();
            return;
          }
    
          const signingClient = await getSigningBzeClient({rpcEndpoint: getRpcUrl(), signer: offlineSigner});
          const { payPublisherRespect } = bze.cointrunk.v1.MessageComposer.withTypeUrl;
          const payPublisherRespectMsg = payPublisherRespect({
            creator: walletAddress,
            address: publisherAddress,
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
            onSubmitSuccess();
          } catch (e) {
            toast({
              title: 'Error: ' + e,
              status: 'error',
              isClosable: true,
            })
          }
          
          setSubmittingForm(false);
          onModalClose();
        }
      }

    return (
        <Modal
        initialFocusRef={initialRef}
        isOpen={showModal}
        onClose={onModalClose}
        isCentered
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Pay your respect to: {publisherName}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <Alert status='info' mb={2}>
                <AlertIcon />
                Use your coins to show gratitude to the publisher. 1 BZE = 1 Respect! Part of the coins go to the publisher to keep up the good work, the other part to BZE community for keeping CoinTrunk decentralized. 
                </Alert>
                <FormControl>
                <FormLabel>BZE Amount</FormLabel>
                <Input disabled={submittingForm} name='amount' type={'number'} ref={initialRef} placeholder='Total BZE you pay' onChange={onAmountChange} />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button disabled={submittingForm} colorScheme='blue' mr={3} onClick={onPayRespectButtonClick()}>
                {submittingForm && (<Spinner size='xs' />)}{' '}Pay
                </Button>
                <Button onClick={onModalClose}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
