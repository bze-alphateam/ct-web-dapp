import {
    Alert,
    AlertIcon,
    Box,
    AlertTitle,
    AlertDescription,
    CloseButton,
    Text,
    UnorderedList,
    ListItem
} from "@chakra-ui/react"
import { useEffect, useState } from "react";

const showAlertStorageKey = 'dappwarning:ack'

const shouldShowAlert = (): boolean => {
    const showAlertCached = localStorage.getItem(showAlertStorageKey); 
    if (null === showAlertCached) {
        console.log(1);
        return true;
    }

    const parsed = JSON.parse(showAlertCached);
    if (parsed.expiresAt < new Date().getTime()) {
        localStorage.removeItem(showAlertStorageKey);
        console.log(2);
        return true;
    }
    console.log(3);
    return parsed.showAlert;
}

const alertAcknowledged = () => {
    const cacheData = {
        showAlert: false,
        expiresAt: new Date().getTime() + (1000 * 60 * 60 * 24 * 14) //14 days
    }; 
    localStorage.setItem(
        showAlertStorageKey,
        JSON.stringify(cacheData)  
    )
}

export const DappWarning = () => {
    const [showAlert, setShowAlert] = useState(false);
    
    const onAlertClose = () => {
        alertAcknowledged();
        setShowAlert(false);
    }
    
    useEffect(() => {
        setShowAlert(shouldShowAlert());
    }, [])

    return showAlert ?
        (
            <Alert status='warning' justifyContent={'center'}>
                <AlertIcon />
                <Box >
                    <AlertTitle>Attention!</AlertTitle>
                    <AlertDescription>
                        <Text>Your are navigating on a Decentralized App and viewing permissionless content submitted on BeeZee (BZE) blockchain.
                            All the content present here was submitted under blockchain&apos;s own rules.
                        </Text>
                        <UnorderedList>
                            <ListItem>Articles can redirect only to Accepted Domains decided through governance proposals</ListItem>
                            <ListItem>Paid articles can be submitted by anyone willing to pay the tax required</ListItem>
                            <ListItem>Paid articles are limited to a certain number each month</ListItem>
                            <ListItem>Publishers are decided through governance proposals</ListItem>
                            <ListItem>Publisher&apos;s respect represents the trust given by the community</ListItem>
                        </UnorderedList>
                    </AlertDescription>
                </Box>
                <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={onAlertClose}
                />
            </Alert>
        ) : (<></>)
    
}