import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en-us'>
        <Head>
          <meta property='og:site_name' content='NBA Replay' />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='icon' href='/favicon.ico' />
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
