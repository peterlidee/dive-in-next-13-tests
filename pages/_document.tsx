import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'
 
class MyDocument extends Document {
  // static async getInitialProps(
  //   ctx: DocumentContext
  // ): Promise<DocumentInitialProps & { a : 1}> {
  //   const initialProps = await Document.getInitialProps(ctx)
    
  //   return {
  //     ...initialProps, 
  //     a: 1
  //   }
  // }
 
  render() {
    // console.log(this.props, '?prop in document')
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
 
export default MyDocument