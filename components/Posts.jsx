import SinglePost from "./SinglePost"
import {
    Box,
    Grid,
    GridItem,
  } from '@chakra-ui/react';

export default function Posts({ posts, page, tagFilter, selectFilter }) {

    return (
        <Box width="1080px" mx="auto" pt="128px" pb="12" pl="120px">
            <Grid templateColumns='repeat(3, 1fr)' gap={12}>
            {posts && posts.slice(0).reverse().map((post, index) => (
            //filter based on selected sidebar tag
            (!tagFilter || post.tags.includes(tagFilter)) && 
            //filter whether projects or blog
            (((page == 'blog') && post.cuid) || ((page == 'projects') && !post.cuid)) &&
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
