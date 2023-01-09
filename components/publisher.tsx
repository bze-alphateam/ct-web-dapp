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
  Heading,
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
            <Flex>
                
            </Flex>
        </Stack>
    );
  };