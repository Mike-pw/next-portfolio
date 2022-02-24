import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
            <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-X0Y72YDJYG`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X0Y72YDJYG', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />

        <title>melgren.dev</title>
        <meta name="description" content="Portfolio of Mike Melgren, Web Developer from Canada" />
        <meta charset="utf-8" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Portfolio site of Mike Melgren" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:url" content="https://melgren.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="melgren.dev" />
        <meta property="og:description" content="Portfolio site of Mike Melgren" />
        <meta property="og:image" content="https://melgren.dev/thumbnail.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="melgren.dev" />
        <meta property="twitter:url" content="https://melgren.dev/" />
        <meta name="twitter:title" content="melgren.dev" />
        <meta name="twitter:description" content="Portfolio site of Mike Melgren" />
        <meta name="twitter:image" content="https://melgren.dev/thumbnail.jpg" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;