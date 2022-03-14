import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import sanityClient from "../util/client"
import Posts from "../components/Posts"
import Sidebar from "../components/Sidebar"
import {
  Flex,
  Slide
} from '@chakra-ui/react';

export default function AllPosts({ posts }) {

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
          <Sidebar page={page} tags={tags} selectFilter={selectFilter} tagFilter={tagFilter} />
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

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'blog' } },
      { params: { slug: 'projects' } }
    ],
    fallback: false
  };
}

export async function getStaticProps() {

  const blogPosts = await getBlogPosts()
  for (const post of blogPosts) {
    const postIndex = blogPosts.indexOf(post)
    const tags = await getPostTags(post.slug);
    const tagArray = []
    tags.forEach((tag, tagIndex) => {
      tagArray.push(tags[tagIndex].name)
      })
    blogPosts[postIndex].tags = tagArray
    blogPosts[postIndex].link = `/blog/${blogPosts[postIndex].slug}`
    blogPosts[postIndex].github = `https://github.com/MikeMelgren/hashnode-backups/blob/main/${blogPosts[postIndex].cuid}.md`
    }
    const projects = await (getProjects())
    const posts = blogPosts.concat(projects)
    posts.sort(function(a,b){
      return a.dateAdded.localeCompare(b.dateAdded);
    })
    return {
      props: {
        posts
      }
    }
  }
  
  ///import following four functions from a separate file ( I think!?)
  //get first page of blog posts from hashnode
  async function getBlogPosts() {
    const response = await fetch('https://api.hashnode.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query{
            user(username:"mikemelgren") {
              publication {
                posts(page:0) {
                    cuid
                    title
                    slug
                    brief
                    dateAdded
                }
              }
            }
          }
        `,
      }),
    })
    const postData = await response.json()
    const posts = postData.data.user.publication.posts
    return posts
  }
  
  //get post tags from hashnode separate due to bug
  async function getPostTags(slug) {
    const  response  = await fetch('https://api.hashnode.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query{
          post(slug: "${slug}", hostname: "melgren.dev") {
            tags {
              name
            }
          }
        }
        `,
      }),
    })
    const tagData = await response.json()
    const tags = tagData.data.post.tags
    return tags
  }
  
  //get all projects from sanity
  async function getProjects() {
    const projects = await sanityClient.fetch(`*[_type == "project"]{
        title,
        brief,
        link,
        github,
        dateAdded,
        tags
    }`)
    return projects
  }  