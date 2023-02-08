import { LinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Grid,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Info, InfoList } from './types';

export const InfoLink = ({url, title}: Info) => {
    return (
        <Link href={url} target="_blank" _hover={{ textDecoration: 'none' }}>
          <Stack
            isInline={true}
            key={title}
            spacing={3}
            h="full"
            p={4}
            justifyContent="center"
            borderRadius="md"
            border="1px solid"
            borderColor={useColorModeValue('blackAlpha.200', 'whiteAlpha.100')}
            _hover={{
              boxShadow: useColorModeValue(
                '0 2px 5px #ccc',
                '0 1px 3px #727272, 0 2px 12px -2px #2f2f2f'
              )
            }}
          >
            <Box color={useColorModeValue('primary.500', 'primary.200')}>
              <Icon as={LinkIcon} />
            </Box>
            <Stack spacing={1}>
              <Text fontSize="lg" fontWeight="semibold">
                {title}
              </Text>
              <Text
                lineHeight="short"
                color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
              >
                {url}
              </Text>
            </Stack>
          </Stack>
        </Link>
    );
}

export const InfoGrid = ({info}: InfoList) => {
    return (
        <Grid templateColumns={{ md: '1fr 1fr' }} gap={8} mb={20} mt={10}>
        {info.map((infoItem: Info) => (
          <InfoLink key={infoItem.title} {...infoItem}></InfoLink>
        ))}
      </Grid>
    );
}