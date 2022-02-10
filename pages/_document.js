import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
        <title>Portfolio of Mike Melgren</title>
        <meta name="description">Portfolio of Mike Melgren, Web Developer from Canada</meta>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo.png" />
        </Head>
        <body>
          <Main />
          <NextScript
            src="https://www.googletagmanager.com/gtag/js?id=G-X0Y72YDJYG"
            strategy="afterInteractive"
            />
            <NextScript id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

             gtag('config', 'G-X0Y72YDJYG');
            `}
            </NextScript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;