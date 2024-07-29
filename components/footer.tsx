import {
    Text,
    Stack,
    Link,
  } from '@chakra-ui/react';

export const Footer = () => {
    return (
        <Stack
        isInline={true}
        spacing={1}
        justifyContent="center"
        opacity={0.5}
        fontSize="sm"
      >
        <Text>Built with</Text>
        <Link
          href="https://cosmology.tech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cosmology 
        </Link>
        <Text>and passion by</Text>
        <Link
          href="https://x.com/StefanViB"
          target="_blank"
          rel="noopener noreferrer"
        >
          Faneatiku 
        </Link>
        <Text> | </Text>
        <Link
          href="https://getbze.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          BZE Alpha Team
        </Link>
      </Stack>
    );
}