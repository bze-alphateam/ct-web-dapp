import { QuestionIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
    Button,
    Tooltip,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    ModalFooter,
    FormLabel,
    FormHelperText,
    Input,
    Spinner,
    useToast,
    Textarea
  } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { extractUrlHost, isAcceptedDomain, getAccountBalance, isPublisher, getAnonArticleCost, getActiveAcceptedDomains } from './services';
import { AnonymousArticleAlert } from './anonymous-article-alert';
import { useWallet } from '@cosmos-kit/react';
import { bze, getSigningBzeClient } from '@bze/bzejs';
import { getMinDenom, getRpcUrl } from '../config';
import { coins } from '@cosmjs/stargate';
import { Dec, IntPretty } from '@keplr-wallet/unit';
import { AcceptedDomainSDKType } from '@bze/bzejs/types/codegen/beezee/cointrunk/accepted_domain';

export const ArticleAddModal = ({showModal, onClose, onSubmitSuccess}: {showModal: boolean, onClose: () => void, onSubmitSuccess: () => void}) => {
    const [ isValidTitle, setIsValidTitle ] = useState(false);
    const [ titleError, setTitleError] = useState('');
    const [ title, setTitle ] = useState('');

    const [ isValidUrl, setIsValidUrl ] = useState(false);
    const [ urlError, setUrlError ] = useState('');
    const [ url, setUrl ] = useState('');
    
    const [ isValidPicture, setIsValidPicture ] = useState(true);
    const [ pictureError, setPictureError ] = useState('');
    const [ picture, setPicture ] = useState('');

    const [ pendingSubmit, setPendingSubmit ] = useState(false);
    const [ acceptedDomainsList, setAcceptedDomainsList] = useState('');

    const toast = useToast();
    const { offlineSigner, address } = useWallet();

    const resetState = () => {
        setIsValidTitle(false);
        setTitleError('');
        setTitle('');
        
        setIsValidUrl(false);
        setUrlError('');
        setUrl('');

        setIsValidPicture(true);
        setPictureError('');
        setPicture('');

        setPendingSubmit(false);
    }

    const onModalClose = () => {
        resetState();
        onClose();
    }

    const onTitleChange = (event: any) => {
        setTitle(event.target.value);
    }

    const validateTitle = () => {
        if (title.length < 10) {
            setTitleError('Title too short');
            setIsValidTitle(false);
        } else if (title.length > 320) {
            setTitleError('Title too long');
            setIsValidTitle(false);
        } else {
            setIsValidTitle(true);
        }
    }

    const onUrlChange = (event: any) => {
        setUrl(event.target.value);
    }

    const validateUrl = () => {
        let host = extractUrlHost(url);
        if (null === host) {
            setUrlError('Invalid URL');
            setIsValidUrl(false);
            return;
        }
        
        isAcceptedDomain(host)
        .then((resp) => {
            if (!resp) {
                setUrlError('Not an accepted domain');
            }
            setIsValidUrl(resp);
        })
        .catch((err) => console.log(err));
    }

    const onPictureChange = (event: any) => {
        setPicture(event.target.value);
    }

    const validatePicture = () => {
        if (picture.length === 0) {
            setIsValidPicture(true);
            return;
        }

        let host = extractUrlHost(picture);
        if (null === host) {
            setPictureError('Invalid picture URL');
            setIsValidPicture(false);
            return;
        }

        isAcceptedDomain(host)
        .then((resp) => {
            if (!resp) {
                setPictureError('Not an accepted domain');
            }
            setIsValidPicture(resp);
        })
        .catch((err) => console.log(err));
    }

    const onArticleSubmit = async () => {
        setPendingSubmit(true);
        if (offlineSigner === undefined || address === undefined) {
            toast({
                title: 'Connect your wallet first',
                status: 'error',
                isClosable: true,
                duration: 10000
            });
            return;
        }
        validatePicture();
        validateTitle();
        validateUrl();

        if (!isValidTitle || !isValidUrl || !isValidPicture) {
            toast({
                title: 'Invalid article. Please check the errors.',
                status: 'error',
                isClosable: true,
                duration: 10000
            });

            setPendingSubmit(false);
            return;
        }

        const balance = await getAccountBalance(address);
        if (balance.balance === undefined) {
            setPendingSubmit(false);
            toast({
              title: 'Can not get balance! ',
              status: 'error',
              isClosable: true,
            })

            return;
        }
        
        if (!(await isPublisher(address))) {
            let articleCost = await  getAnonArticleCost();
            if (articleCost.gt(balance.balance.amount)) {
                toast({
                    title: 'Insufficient funds',
                    status: 'error',
                    isClosable: true,
                })
                setPendingSubmit(false);
                return;
            }
        }

        const signingClient = await getSigningBzeClient({rpcEndpoint: getRpcUrl(), signer: offlineSigner});
        const { addArticle } = bze.cointrunk.v1.MessageComposer.withTypeUrl;
        const msg = addArticle({
            publisher: address,
            title: title,
            url: url,
            picture: picture
        });

        try {
            const gasEstimated = await signingClient.simulate(address, [msg], undefined)
            const fee = {
                amount: coins(0, getMinDenom()),
                gas: new IntPretty(new Dec(gasEstimated).mul(new Dec(1.3)))
                  .maxDecimals(0)
                  .locale(false)
                  .toString()
            };
            await signingClient.signAndBroadcast(address, [msg], fee)
            
            toast({
                title: 'Your article has been published!',
                status: 'success',
                isClosable: true,
            });
            onSubmitSuccess();
        } catch (e) {
            toast({
                title: 'Error: ' + e,
                status: 'error',
                isClosable: true,
            });
        }

        setPendingSubmit(false);
        onModalClose();
    }

    const loadAcceptedDomains = async () => {
        let list = await getActiveAcceptedDomains();
        let arrayList: string[] = [];
        list.map((elem: AcceptedDomainSDKType) => {arrayList.push(elem.domain)});

        setAcceptedDomainsList(arrayList.join(', '));
    }

    useEffect(() => {
        loadAcceptedDomains();
    }, []);

    return (
        <Modal
        isOpen={showModal}
        onClose={onModalClose}
        closeOnOverlayClick={false}
        isCentered
        size={'xl'}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={'center'}>Add Article</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <AnonymousArticleAlert/>
                    <FormControl isRequired mb={3}>
                        <FormLabel>Title <Tooltip label='Provide a descriptive title. Readers should be attracted to click on it.'><QuestionIcon mb={1}/></Tooltip></FormLabel>
                        <Textarea name='title' placeholder='Text between 10 and 320 chars' onChange={onTitleChange} onBlur={validateTitle}/>
                        {
                            isValidTitle === true ?
                            <FormHelperText>OK! <CheckIcon color={'green'}/></FormHelperText> :
                            titleError.length > 0 ? 
                            <FormHelperText>{titleError} <CloseIcon color={'red'}/></FormHelperText> :
                            <FormHelperText>Between 10 and 320 chars</FormHelperText>
                        }
                    </FormControl>
                    <FormControl isRequired mb={3}>
                        <FormLabel>URL <Tooltip label={'Accepted domains: ' + acceptedDomainsList}><QuestionIcon mb={1}/></Tooltip></FormLabel>
                        <Input name='url' type={'text'} placeholder='Article source URL' onChange={onUrlChange}  onBlur={validateUrl}/>
                        {
                            isValidUrl === true ?
                            <FormHelperText>OK! <CheckIcon color={'green'}/></FormHelperText> :
                            urlError.length > 0 ? 
                            <FormHelperText>{urlError} <CloseIcon color={'red'}/></FormHelperText> :
                            <FormHelperText>Must be hosted by an accepted domain.</FormHelperText>
                        }
                    </FormControl>
                    <FormControl mb={3}>
                        <FormLabel>Picture URL <Tooltip label='Optional: provide a picture to be displayed in article listing'><QuestionIcon mb={1}/></Tooltip></FormLabel>
                        <Input name='picture' type={'text'} placeholder='A picture for your article' onChange={onPictureChange}  onBlur={validatePicture}/>
                        {
                            isValidPicture === true ?
                            <FormHelperText>OK! <CheckIcon color={'green'}/></FormHelperText> :
                            pictureError.length > 0 ?
                            <FormHelperText>{pictureError} <CloseIcon color={'red'}/></FormHelperText> :
                            <FormHelperText>Must be hosted by an accepted domain.</FormHelperText>
                        }
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button isLoading={pendingSubmit} loadingText='Submitting' colorScheme='blue' mr={3} onClick={onArticleSubmit}>Submit</Button>
                    <Button onClick={onModalClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}