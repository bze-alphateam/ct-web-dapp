import { Alert, AlertIcon } from "@chakra-ui/react";
import { useWallet } from "@cosmos-kit/react";
import { isPublisher } from "./services";
import { useEffect, useState } from "react";
import { getAnonArticleCost, getAnonArticleLimit } from "./services";

export const AnonymousArticleAlert = () => {
    const [ showAlert, setShowAlert ] = useState(false);
    const [ articleCost, setArticleCost ] = useState('');
    const [ articleLimit, setArticleLimit ] = useState(''); 
    const { isWalletConnected, address } = useWallet();

    useEffect(() => {
        const loadParams = async () => {
            if (!isWalletConnected || address === undefined) {
                return;
            }
            
            let shouldShowAlert = !(await isPublisher(address));
            if (shouldShowAlert) {
                let cost = await getAnonArticleCost();
                setArticleCost(Intl.NumberFormat('en', { notation: 'standard' }).format(cost.div(1000000).toNumber()));
    
                let limit = await getAnonArticleLimit();
                setArticleLimit(limit.toString());
                setShowAlert(true);
            }
        }

        loadParams();
    }, [isWalletConnected, address]);

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