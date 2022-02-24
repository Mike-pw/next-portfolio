import React, { ReactNode } from 'react';
import {
    Box,
    CloseButton,
    Flex,
    useColorModeValue,
    Link,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Fade
} from '@chakra-ui/react';
import { ReactText } from 'react';

interface LinkItemProps {
    name: string;
}

interface InitialProps {
    children: ReactNode;
    selectFilter: (tagName: string) => void;
    tags: Array<string>;
}

export default function SimpleSidebar({ children, selectFilter, tags }: InitialProps) {

    const LinkItems: Array<LinkItemProps> = [];
    tags.forEach(tag => {
        const obj = { name: tag }
        LinkItems.push(obj)
    })

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Fade in={true}>
            <Box
                minH="100vh"
                w="240px"
                mt="80px"
                bg={useColorModeValue('gray.100', 'gray.900')}
                display={{ base: 'none', md: 'block' }}
            >
                <SidebarContent
                    h="calc(100vh - 80px)"
                    overflowY='auto'
                    LinkItems={LinkItems}
                    selectFilter={selectFilter}
                    onClose={() => onClose}
                    display={{ base: 'none', md: 'block' }}
                />
            </Box>
        </Fade>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
    selectFilter: (tagName: string) => void;
    LinkItems: Array<LinkItemProps>;
}

const SidebarContent = ({ LinkItems, selectFilter, onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            bg={useColorModeValue('gray.100', 'gray.900')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Tech
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((tag) => (
                <NavItem
                    key={tag.name}
                    onClick={() => selectFilter(tag.name)}>
                    {tag.name}
                </NavItem>
            ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    children: ReactText;
}
const NavItem = ({ children, ...rest }: NavItemProps) => {
    return (
        <Link href="#" style={{ textDecoration: 'none' }}>
            <Flex
                align="center"
                px="6"
                py="3"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'red.500',
                    color: 'white',
                }}
                {...rest}>
                {children}
            </Flex>
        </Link>
    );
};