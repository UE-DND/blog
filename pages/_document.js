// eslint-disable-next-line @next/next/no-document-import-in-page
import BLOG from '@/blog.config'
import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang={BLOG.LANG}>
        <Head>
          {/* 预加载字体 */}
          {BLOG.FONT_AWESOME && (
            <>
              <link
                rel='preload'
                href={BLOG.FONT_AWESOME}
                as='style'
                crossOrigin='anonymous'
              />
              <link
                rel='preload'
                href='https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap'
                as='style'
                crossOrigin='anonymous'
              />
              <link
                rel='preload'
                href='https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300&display=swap'
                as='style'
                crossOrigin='anonymous'
              />
              <link
                rel='stylesheet'
                href={BLOG.FONT_AWESOME}
                crossOrigin='anonymous'
                referrerPolicy='no-referrer'
              />
              <link
                rel='stylesheet'
                href='https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap'
                crossOrigin='anonymous'
                media='print'
                onLoad="this.onload=null;this.media='all'"
              />
              <link
                rel='stylesheet'
                href='https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300&display=swap'
                crossOrigin='anonymous'
                media='print'
                onLoad="this.onload=null;this.media='all'"
              />
            </>
          )}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
