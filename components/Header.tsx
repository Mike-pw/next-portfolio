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

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

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
          px="24"
          maxWidth={'full'}
          margin={'auto'}>
          <NextLink passHref={true} href="/">
            <Link>
              <Heading>Mike Melgren</Heading>
            </Link>
          </NextLink>
          <Spacer />
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
            <DesktopNav />
          </Flex>
          <Spacer />

          <Flex
            w="300px"
            justify="space-around"
            align="center">
            <SocialIcon
              url="https://github.com/MikeMelgren"
              className="social-icon"
              fgColor="#fff"
              style={{ height: 44, width: 44 }}
            />
            <SocialIcon
              url="https://discordapp.com/users/895421310828695563"
              className="social-icon"
              fgColor="#fff"
              style={{ height: 44, width: 44 }}
            />
            <SocialIcon
              url="https://www.reddit.com/user/mikemelgren"
              className="social-icon"
              fgColor="#fff"
              style={{ height: 44, width: 44 }}
            />
            <Button width="48px" onClick={toggleColorMode} size={'lg'} rounded="full">
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Flex>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    </>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <NextLink
            href={navItem.href ?? '#'}
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
              }}>
              {navItem.label}
            </Link>
          </NextLink>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
      </Flex>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
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