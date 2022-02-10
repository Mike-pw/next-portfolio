import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
        <title>Portfolio of Mike Melgren</title>
        <meta name="description">Portfolio of Mike Melgren, Web Developer from Canada</meta>
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