import { PageTitleProps } from '.';
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';

export const TitleBox = ({title, subTitle, subTitleHighlighted}: PageTitleProps)  => {
    return (
        <Box textAlign="center">
          <Heading
            as="h1"
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            fontWeight="extrabold"
            mb={3}
          >
            {title}
          </Heading>
          <Heading
            as="h1"
            fontWeight="bold"
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
          >
            <Text as="span">{subTitle}&nbsp;</Text>
            <Text
              as="span"
              color={useColorModeValue('#0aa4d2', '#48d5ff')}
            >
              {subTitleHighlighted}
            </Text>
          </Heading>
        </Box>
    )
}