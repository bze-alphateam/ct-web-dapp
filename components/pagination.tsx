import {
    Flex,
    Spacer,
    Box,
    IconButton,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const Pagination = ({currentPage, hasNext, onBack, onForward}: {currentPage: number, hasNext: boolean, onBack: () => void, onForward: () => void}) => {
    const router = useRouter();
    useEffect(() => {
        router.push({query: {page: currentPage}});
    // eslint-disable-next-line react-hooks/exhaustive-deps
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