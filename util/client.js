import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: "k9g54qqz",
    dataset: "production",
    useCdn: false,
    apiVersion: '2022-02-24'
})