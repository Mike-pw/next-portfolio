import {
    Heading,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Flex,
    useColorModeValue,
    keyframes,
} from '@chakra-ui/react';
import Link from 'next/link'
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

                <Text
                    textAlign={'left'}
                    color={useColorModeValue('gray.700', 'gray.400')}
                    px={3}
                    mt={6}>
                    {truncate(data.brief, 20)}
                </Text>

                <Flex wrap="wrap" width="272px" align={'center'} justify={'center'} mt={6} mb={6}>
                    {data.tags && data.tags.map((tag, index) => (
                        <Button
                            name="tag"
                            key={index}
                            size="xs"
                            px={2}
                            py={1}
                            mx={1}
                            my={1}
                            fontWeight={'400'}
                            onClick={() => selectFilter(tag)}
                            className={tag === tagFilter ? "active" : ""}
                            _hover={{
                                bg: 'red.500',
                                color: 'white'
                            }}
                        >
                            {tag}
                        </Button>
                    ))}
                </Flex>

                <Stack mt={8} direction={'row'} spacing={4}>
                    <Link href={data.link ? data.link : ""} passHref={true}>
                        <Button
                            name="view"
                            flex={1}
                            fontSize={'sm'}
                            rounded={'md'}>
                            View
                        </Button>
                    </Link>
                    <Link href={data.github ? data.github : ""} passHref={true}>
                        <Button
                            name="repo"
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
                    </Link>
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