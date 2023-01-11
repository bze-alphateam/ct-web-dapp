import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Flex,
  Link,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  Badge,
  Divider,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { PublisherProps } from './types';

export const Publisher = ({name, address, active, articles_count, created_at, respect }: PublisherProps) => {
    return (
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
            <Flex p={2} direction={{base:'column-reverse' ,md: 'row'}} h={'100%'}>
                <Box p={2} minWidth={'250px'}>
                    <VStack>
                        {/* move them in components */}
                        {active && (<Badge borderRadius='full' px='2' colorScheme='green'>active</Badge>)}
                        {!active && (<Badge borderRadius='full' px='2' colorScheme='red'>inactive</Badge>)}
                        {parseInt(respect) > 10000000000 && (<Badge borderRadius='full' px='2' colorScheme='yellow'>respected</Badge>)}
                        {parseInt(respect) > 100000000000 && (<Badge borderRadius='full' px='2' colorScheme='teal'>highly respected</Badge>)}
                        {articles_count >= 10 && articles_count < 100 && (<Badge borderRadius='full' px='2' colorScheme='gray'>Junior</Badge>)}
                        {articles_count >= 100 && articles_count < 1000 && (<Badge borderRadius='full' px='2' colorScheme='yellow'>Serious</Badge>)}
                        {articles_count >= 1000 && articles_count < 10000 && (<Badge borderRadius='full' px='2' colorScheme='green'>Contributor</Badge>)}
                        {articles_count >= 10000 && articles_count < 100000 && (<Badge borderRadius='full' px='2' colorScheme='blue'>Provider</Badge>)}
                        {articles_count >= 100000 && (<Badge borderRadius='full' px='2' colorScheme='orange'>Godfather</Badge>)}
                    </VStack>
                </Box>
                <Box
                    p={2}
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                    >
                    {name}
                </Box>
            </Flex>
        </Stack>
    );
  };