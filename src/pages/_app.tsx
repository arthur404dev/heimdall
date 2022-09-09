import "../styles/tailwind.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { Navbar, Auth } from "../components"
import Head from "next/head"
import { withTRPC } from "@trpc/next"
import { AppRouter } from "./api/trpc/[trpc]"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Heimdall - Link Redirector</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Auth>
          <Navbar />
          <Component {...pageProps} />
        </Auth>
      </SessionProvider>
    </>
  )
}

const getBaseUrl = () => {
  if (process.browser) return "" // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config() {
    const url = `${getBaseUrl()}/api/trpc`

    return {
      url,
    }
  },
  ssr: false,
})(MyApp)
