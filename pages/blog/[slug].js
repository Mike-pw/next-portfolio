import { useEffect, useState } from "react"
import { useRouter } from "next/router"
//import ReactMarkdown from 'react-markdown'
//import SyntaxHighlight from '../../components/SyntaxHighlight'

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

    if (!singlePost) return null
     console.log(singlePost)
    return (
        <main>
            <section className="post">
                <article className="blog-post-article">
                    <h2>{singlePost.title}</h2>

                                                {singlePost.contentMarkdown}

                </article>
            </section>
        </main>
    )
}