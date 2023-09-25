import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
 
type AppOwnProps = { a: string }
 
export default function MyApp({
  Component,
  pageProps,
  a,
}: AppProps & AppOwnProps) {
  return (
    <>
      <Component {...pageProps} a={a} />
    </>
  )
}
 
MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context)
  return { ...ctx, a: 'data' }
}