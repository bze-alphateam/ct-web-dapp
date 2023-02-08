import {
    Flex,
    Spacer,
    Box,
    IconButton,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

export const Pagination = ({currentPage, hasNext, onBack, onForward}: {currentPage: number, hasNext: boolean, onBack: () => void, onForward: () => void}) => {
    
    useEffect(() => {
        console.log('effect', currentPage);
    }, [currentPage]);

    return (
        <Flex>
        <Spacer />
        <Box p='4' flexDirection={'row'}>
          {currentPage > 1 && <IconButton mr={5} aria-label='Previous page' icon={<ArrowBackIcon />} onClick={onBack}/>}
          {currentPage}
          {hasNext && <IconButton ml={5} aria-label='Next page' icon={<ArrowForwardIcon />} onClick={onForward} />}
        </Box>
        <Spacer />
      </Flex>
    );
}