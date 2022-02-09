import { useEffect, useState } from 'react'
import Head from next/head
import sanityClient from "../util/client"
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Header from "../components/Header"
import '../styles/globals.css'
import '../styles/blogPost.css'
import '../styles/prism-theme.css'
import '@fontsource/pathway-gothic-one/400.css'

//focus outline for a11y
const focusShadow = '0 0 0 2px rgba(125,125,125,.75)'

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
          _focus: {
            boxShadow: focusShadow
          }
      }
    },
    Link: {
      baseStyle: {
          _focus: {
            boxShadow: focusShadow
          }
      }
    }
  },
})

function MyApp({ Component, pageProps }) {
  
  const [posts, setPosts] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllPosts()
      .then((response) => setPosts(response))
      .then(() => setLoading(false))
  }, [])

  if (isLoading) return null
  if (!posts) return null

  return (
  <ChakraProvider theme={theme}>
  <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-X0Y72YDJYG"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-X0Y72YDJYG', { page_path: window.location.pathname });
            `,
          }}
        />
      </Head>
    <Header />
    <Component {...pageProps} posts={posts} />
  </ChakraProvider>
  )
}

export default MyApp

export async function getAllPosts() {

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
    return posts
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