import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs'
import React, { ReactNode } from 'react';
import {
    Fade
} from '@chakra-ui/react';

require('prismjs/components/prism-javascript')
require('prismjs/components/prism-css')
require('prismjs/components/prism-jsx')
require('prismjs/components/prism-markup')

export default function Post() {
    const router = useRouter()
    const slug = router.query.slug
    const [singlePost, setSinglePost] = useState(null)

    //hashnode GraphQL query
    const GET_SINGLE_POST = `
    query {
        post(
            slug: "${slug}"
            hostname: "blog.melgren.dev"
        ) {
            title
            contentMarkdown
        }
    }
`;

    //request to hashnode
    async function gql(query) {
        const data = await fetch('https://api.hashnode.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query
            })
        });
        return data.json();
    }

    useEffect(() => {
        gql(GET_SINGLE_POST)    
            .then((result) => setSinglePost(result.data.post))
            .catch(console.error)
    }, [slug])

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
                        className="language-markup">
                            {singlePost.contentMarkdown}
                        </ReactMarkdown>
                </article>
            </Fade>
            </section>
        </main>
    )
}