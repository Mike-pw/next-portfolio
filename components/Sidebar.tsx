import React, { ReactNode } from 'react';
import {
    Box,
    Flex,
    useColorModeValue,
    Text,
    BoxProps,
    FlexProps,
    Fade,
    Button
} from '@chakra-ui/react';
import { ReactText } from 'react';

interface LinkItemProps {
    name: string;
}

interface InitialProps {
    children: ReactNode;
    selectFilter: (tagName: string) => void;
    tagFilter: string;
    tags: Array<string>;
}

export default function SimpleSidebar({ selectFilter, tags, tagFilter }: InitialProps) {

    const LinkItems: Array<LinkItemProps> = [];
    tags.forEach(tag => {
        const obj = { name: tag }
        LinkItems.push(obj)
    })

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
                    tagFilter={tagFilter}
                    display={{ base: 'none', md: 'block' }}
                />
            </Box>
        </Fade>
    );
}

interface SidebarProps extends BoxProps {
    selectFilter: (tagName: string) => void;
    LinkItems: Array<LinkItemProps>;
    tagFilter: string;
}

const SidebarContent = ({ LinkItems, selectFilter, tagFilter, ...rest }: SidebarProps) => {
    return (
        <Box
            bg={useColorModeValue('gray.100', 'gray.900')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            p="3"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Tech
                </Text>
            </Flex>
            {LinkItems.map((tag) => (
                <NavItem
                    key={tag.name}
                    tagName={tag.name}
                    selectFilter={selectFilter}
                    tagFilter={tagFilter}
                    onClick={() => selectFilter(tag.name)}>
                    {tag.name}
                </NavItem>
            ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    children: ReactText;
    selectFilter: (tagName: string) => void;
    tagName: string;
    tagFilter: string;
}

const NavItem = ({ children, selectFilter, tagFilter, tagName }: NavItemProps) => {
    return (
        <Button
            color={useColorModeValue('gray.600', 'gray.200')}
            bg={useColorModeValue('gray.100', 'gray.900')}
            width="100%"
            size="lg"
            mt="1"
            justifyContent="left"
            borderRadius="lg"
            onClick={() => selectFilter(tagName)}
            className={tagFilter === tagName ? "active" : ""}
            _hover={{
                bg: 'red.500',
                color: 'white',
            }}>
            {children}
        </Button>
    );
};