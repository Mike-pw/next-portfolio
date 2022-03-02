import {
  Heading,
  Box,
  Flex,
  Spacer,
  Link,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Collapse,
  Text,
  useDisclosure,
  IconButton
} from '@chakra-ui/react';
import {
  MoonIcon,
  SunIcon,
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import { SocialIcon } from "react-social-icons";
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  return (
    <>
      <Box
        pos="fixed"
        width="full"
        style={{ zIndex: 10 }}
        bg={useColorModeValue('gray.100', 'gray.900')}
      >
        <Flex
          h={20}
          alignItems={'center'}
          justifyContent={'space-between'}
          px={{ base: '6', md: '12', lg: '24' }}
          maxWidth={'full'}
          margin={'auto'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
            justify={'center'}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav router={router} />
          </Flex>
          <Spacer />
          <NextLink passHref={true} href="/">
            <Link py='2' px="4" rounded="lg">
              <Heading fontFamily={'Pathway Gothic One'}
                as='h1'
                fontSize='3xl'>
                melgren.dev
              </Heading>
            </Link>
          </NextLink>
          <Spacer />
          <Spacer />
          <Flex
            w="200px"
            justify="space-around"
            align="center">
            <Button aria-label="Color Mode" name="color-mode" width="40px" onClick={toggleColorMode} size={'md'} rounded="full">
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <SocialIcon
              url="https://github.com/MikeMelgren"
              className="social-icon"
              fgColor="#fff"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="https://discordapp.com/users/895421310828695563"
              className="social-icon"
              fgColor="#fff"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="https://www.reddit.com/user/mikemelgren"
              className="social-icon"
              fgColor="#fff"
              style={{ height: 40, width: 40 }}
            />
          </Flex>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <MobileNav onToggle={onToggle} />
        </Collapse>
      </Box>
    </>
  );
}

const DesktopNav = ({ router }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Stack direction={'row'} spacing={1}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <NextLink
            href={navItem.href}
            passHref={true}
          >
            <Link
              py={3}
              px={6}
              rounded={'md'}
              fontSize={'lg'}
              size={'lg'}
              fontWeight={600}
              color={linkColor}
              _hover={{
                bg: 'red.500',
                color: 'white',
                textDecoration: 'none',
              }}
              className={(navItem.href.includes(router.query.slug) || ((navItem.href == "/") && (!router.query.slug))) ? "active" : ""}>
              {navItem.label}
            </Link>
          </NextLink>
        </Box>
      ))}
    </Stack>
  );
};

interface MobileNav {
  onToggle: () => void;
}

const MobileNav = ({ onToggle }: MobileNav) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem onToggle={onToggle} key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

interface MobileNavItem {
  label: string;
  href?: string;
  onToggle: () => void;
}

const MobileNavItem = ({ label, href, onToggle }: MobileNavItem) => {

  return (
    <Stack spacing={4} onClick={() => onToggle()}>
      <NextLink href={href} passHref={true}>
        <Link
          py={2}
          justify={'space-between'}
          align={'left'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
        </Link>
      </NextLink>
    </Stack>
  );
};

interface NavItem {
  label: string;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'About',
    href: '/',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Resume',
    href: 'https://techrez.io/resume/mike-melgren',
  },
];