import { Alert, AlertIcon } from "@chakra-ui/react";
import { useWallet } from "@cosmos-kit/react";
import { isPublisher } from "./services";
import { useEffect, useState } from "react";
import { getAnonArticleCost, getAnonArticleLimit, getPrettyAnonArticleCost } from "./services/paramsService";

export const AnonymousArticleAlert = () => {
    const [ showAlert, setShowAlert ] = useState(false);
    const [ articleCost, setArticleCost ] = useState('');
    const [ articleLimit, setArticleLimit ] = useState(''); 
    const { isWalletConnected, address } = useWallet();
    
    const loadParams = async () => {
        if (!isWalletConnected || address === undefined) {
            return;
        }
        console.log(1);
        let shouldShowAlert = !(await isPublisher(address));
        if (shouldShowAlert) {
            console.log(2);
            let cost = await getAnonArticleCost();
            setArticleCost(Intl.NumberFormat('en', { notation: 'standard' }).format(cost.div(1000000).toInt()));
            console.log(3);
            let limit = await getAnonArticleLimit();
            setArticleLimit(limit.toString());
            setShowAlert(true);
            console.log(14);
        }
    }

    useEffect(() => {
        loadParams();
    }, []);
   
    return (
        <>
        {
            showAlert && 
            <Alert status='warning' mb={3}>
                <AlertIcon />
                Attention! You are not a publisher on BZE blockchain.
                Only publishers accepted by the blockchain can post unlimited articles for free. Anonymous articles cost {articleCost} BZE and are limited to {articleLimit} each month.
            </Alert>
        }
        </>
    );
}