import { useEffect } from "react"
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs'
import React from 'react';
import {
    Fade
} from '@chakra-ui/react';

require('prismjs/components/prism-jsx')

export default function Post( { singlePost }) {

    useEffect(() => {
        Prism.highlightAll()
      })

    if (!singlePost) return null

    return (
        <main>
            <section>
                <Fade in={true}>
                    <article className="blog-post-article">
                        <h2 className="postTitle">{singlePost.title}</h2>
                        <ReactMarkdown
                            className="language-jsx">
                                {singlePost.contentMarkdown}
                            </ReactMarkdown>
                    </article>
                </Fade>
            </section>
        </main>
    )
}

export async function getStaticPaths() {
    //get all paths/slugs from hashnode
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
                    slug
                }
                }
            }
            }
        `,
        }),
    })
    const blogData = await response.json()
    const slugs = blogData.data.user.publication.posts
    const paths = slugs.map(({ index, slug }) => ({
        params: { slug: slug },
    }))
    return {
    paths: paths,
    fallback: false
    };
}

export async function getStaticProps({ params }) {
    
    //const { slug } = params;

    //console.log(slug)
    
    //hashnode GraphQL query
    const GET_SINGLE_POST = `
    query {
        post(
            slug: "${params.slug}"
            hostname: "blog.melgren.dev"
        ) {
            title
            contentMarkdown
        }
    }
`;

    //request to hashnode
    async function gql(query) {
        const response = await fetch('https://api.hashnode.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query
            })
        });
        return response.json();
    }

    const response = await gql(GET_SINGLE_POST)
    const singlePost = response.data.post

    return {
        props: {
          singlePost
        }
      }

}