import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Posts from "../components/Posts"
import Sidebar from "../components/Sidebar"
import {
  Flex,
  Slide
} from '@chakra-ui/react';

export default function AllPosts({posts }) {

    const router = useRouter()
    const page = router.query.slug

    const [tagFilter, setTagFilter] = useState("")

    function selectFilter(tagName) {
        if (tagFilter == tagName) {
          setTagFilter(null)
        } else
        setTagFilter(tagName)
        }
      
    const [tags, setTags] = useState(null)

    useEffect(() => {
    setTags(getTags(posts, page))
    selectFilter('')
    },[page])

    if (!tags) return null

  return (
    <Flex>
      <Slide in={true} direction='left'>
          <Sidebar page={page} tags={tags} selectFilter={selectFilter} />
      </Slide>
    <Posts page={page} posts={posts} tagFilter={tagFilter} selectFilter={selectFilter} />
    </Flex>
  )
}

   //get tags that exist in current page's posts, no duplicates
   function getTags(posts, page) {
    const tags = []
    posts.forEach(post => {
    if (page == 'blog'){
        if(!post.cuid) {
            return true
        } else
      post.tags.forEach(tag => {
        if (!tags.includes(tag)){
          tags.push(tag)
        }
      })
    } else if (page == 'projects'){
        if(post.cuid) {
            return true
        } else
      post.tags.forEach(tag => {
        if (!tags.includes(tag)){
          tags.push(tag)
        }
      })
    }
  })
  return tags
  }
