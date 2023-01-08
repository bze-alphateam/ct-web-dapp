import { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Image,
  Icon,
  Button,
  useDisclosure,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { JsonObject } from '@cosmjs/cosmwasm-stargate';
import { WalletSection } from '../components';

const Links = [
    {
        name: 'Articles',
        path: '/',
    },
    {
        name: 'Publishers',
        path: '/publishers',
    }
];

const NavLink = ({ children, current }: { children: JsonObject, current: string}) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
    }}
    href={children.path}>
    <Button variant={current === children.name ? 'outline' : 'ghost'}>
        {children.name}
    </Button>
  </Link>
);

export default function Navbar({current}: {current: string}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={2} alignItems={'center'}>
            <Box display={{ base: 'none', md: 'flex' }}>
                <Link>
                    <Image src='/bze.svg' alt='cointrunk web app' boxSize='40px'></Image>
                </Link>
            </Box>
            <HStack
              as={'nav'}
              spacing={2}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.name} current={current}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <HStack spacing={2} alignItems={'center'}>
          
            <WalletSection></WalletSection>
            <Button variant="outline" onClick={toggleColorMode}>
                <Icon
                    as={colorMode === 'light' ? BsFillMoonStarsFill : BsFillSunFill}
                />
            </Button>
          </HStack>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} current={current}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}