import Document, { Head, Main, NextScript } from 'next/document'
import {disableDevTools} from 'utils/utils'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <script>
            {disableDevTools}
          </script>
          <NextScript />
        </body>
      </html>
    )
  }
}