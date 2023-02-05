import { Alert, AlertIcon } from "@chakra-ui/react";
import { useWallet } from "@cosmos-kit/react";
import { isPublisher } from "./services";
import { useEffect, useState } from "react";

export const AnonymousArticleAlert = () => {
    const [ showAlert, setShowAlert ] = useState(false);
    const { isWalletConnected, address } = useWallet();
    
    useEffect(() => {
        if (!isWalletConnected || address === undefined) {
            setShowAlert(true);
            return;
        }
        isPublisher(address)
        .then((isPublisher) => {
            setShowAlert(!isPublisher);
        })
    }, []);
   
    return (
        <>
        {
            showAlert && 
            <Alert status='warning' mb={3}>
                <AlertIcon />
                Attention! You are not a publisher on BZE blockchain.
                Only publishers accepted by the blockchain can post unlimited articles for free. Anonymous articles cost 25,000 and are limited to 5 each month.
            </Alert>
        }
        </>
    );
}