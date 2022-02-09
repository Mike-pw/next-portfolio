import {
    Heading,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Badge,
    Flex,
    useColorModeValue,
    keyframes,
} from '@chakra-ui/react';

const fade = keyframes`
  from {opacity: 0;}
  to {opacity: 1}
`;

export default function SinglePost({ data, selectFilter, tagFilter }) {

    const colorModeValue = useColorModeValue('gray.50', 'gray.800')

    const animation = `${fade} .3s linear`;

    return (
        <Center>
            <Box key={Math.random()}
                animation={animation}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    {data.title}
                </Heading>
                {data.cuid ?
                    <Text fontWeight={600} color={'gray.500'} mb={4}>
                        Blog
                    </Text> :
                    <Text fontWeight={600} color={'gray.500'} mb={4}>
                        Project
                    </Text>}
                <Text
                    textAlign={'left'}
                    color={useColorModeValue('gray.700', 'gray.400')}
                    px={3}>
                    {truncate(data.brief, 20)}
                </Text>

                <Flex wrap="wrap" width="272px" align={'center'} justify={'center'} mt={6}>
                    {data.tags && data.tags.map((tag, index) => (
                        <Button
                            key={index}
                            size="xs"
                            px={2}
                            py={1}
                            mx={1}
                            my={1}
                            fontWeight={'400'}
                            onClick={() => selectFilter(tag)}
                            bg={activeTag(tag, tagFilter)}
                            _hover={{
                                bg: activeTag(tag, tagFilter),
                            }}
                        >
                            {tag}
                        </Button>
                    ))}
                </Flex>
                <Stack mt={8} direction={'row'} spacing={4}>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = data.link;
                        }}
                        flex={1}
                        fontSize={'sm'}
                        rounded={'md'}>
                        View
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = data.github;
                        }}
                        flex={1}
                        fontSize={'sm'}
                        rounded={'md'}
                        bg={'red.500'}
                        color={'white'}

                        _hover={{
                            bg: 'red.600',
                        }}>
                        Repo
                    </Button>
                </Stack>
            </Box>
        </Center>
    );
}

function truncate(str, maxWords) {
    const newString = str.split(" ").splice(0, maxWords).join(" ");
    if (str.length > newString.length) {
        return newString + "...";
    } else {
        return newString
    }
}

function activeTag(tag, tagFilter) {
    if (tag == tagFilter) {
        return 'red.600'
    }
}