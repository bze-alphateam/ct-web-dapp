import { QuestionIcon, CheckIcon, WarningIcon, CloseIcon } from '@chakra-ui/icons';
import { bze } from '@bze/bzejs';
import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    Image,
    Icon,
    Button,
    useDisclosure,
    Stack,
    useColorMode,
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
    Alert,
    AlertIcon,
  } from '@chakra-ui/react';
import { useState } from 'react';
import { extractUrlHost, isAcceptedDomain } from './services/acceptedDomainService';

export const ArticleAddModal = ({showModal, onClose}: {showModal: boolean, onClose: () => void}) => {
    const [ isValidTitle, setIsValidTitle ] = useState(false);
    const [ titleError, setTitleError] = useState('');
    const [ title, setTitle ] = useState('');

    const [ isValidUrl, setIsValidUrl ] = useState(false);
    const [ urlError, setUrlError ] = useState('');
    const [ url, setUrl ] = useState('');
    
    const [ isValidPicture, setIsValidPicture ] = useState(true);
    const [ pictureError, setPictureError ] = useState('');
    const [ picture, setPicture ] = useState('');

    const onTitleChange = (event: any) => {
        setTitle(event.target.value);
    }

    const validateTitle = () => {
        if (title.length < 20) {
            setTitleError('Title too short');
            setIsValidTitle(false);
        } else if (title.length > 140) {
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

    return (
        <Modal
        isOpen={showModal}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={'center'}>Add Article</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Alert status='warning' mb={3}>
                        <AlertIcon />
                        Attention! You are not a publisher on BZE blockchain.
                        Only publishers accepted by the blockchain can post unlimited articles for free. Anonymous articles cost 25,000 and are limited to 5 each month.
                    </Alert>
                    <FormControl isRequired mb={3}>
                        <FormLabel>Title <Tooltip label='Provide a title as long as possible. Readers should be attracted to click on it.'><QuestionIcon mb={1}/></Tooltip></FormLabel>
                        <Input name='title' type={'text'} placeholder='Text between 20 and 140 chars' onChange={onTitleChange} onBlur={validateTitle}/>
                        {
                            isValidTitle === true ?
                            <FormHelperText>OK! <CheckIcon color={'green'}/></FormHelperText> :
                            titleError.length > 0 ? 
                            <FormHelperText>{titleError} <CloseIcon color={'red'}/></FormHelperText> :
                            <FormHelperText>Between 20 and 140 chars</FormHelperText>
                        }
                    </FormControl>
                    <FormControl isRequired mb={3}>
                        <FormLabel>URL</FormLabel>
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
                        <FormLabel>Picture URL <Tooltip label='You can provide a picture to be displayed in article listing'><QuestionIcon mb={1}/></Tooltip></FormLabel>
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
                    <Button colorScheme='blue' mr={3}>Submit</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}