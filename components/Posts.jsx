import SinglePost from "./SinglePost"
import {
    Box,
    Grid,
    GridItem,
  } from '@chakra-ui/react';

export default function Posts({ posts, page, tagFilter, selectFilter }) {

    return (
        <Box width={{base: '360px', lg: '720px', xl: "1080px"}} mx="auto" pt="128px" pb="12" pl={{base: '6', md: "120px"}}>
            <Grid templateColumns={{base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)'}} gap={12}>
            {posts && posts.slice(0).reverse().map((post, index) => (
            //filter based on the selected sidebar tag
            (!tagFilter || post.tags.includes(tagFilter)) && 
            //filter whether projects or blog
            (((page == 'blog') && post.cuid) || ((page == 'work') && !post.cuid)) &&
            <GridItem 
            key={index} 
            w='320px'
            >
            <SinglePost selectFilter={selectFilter} tagFilter={tagFilter} data={post} />
            </GridItem>         
        ))}
            </Grid>
        </Box>
    )
}
