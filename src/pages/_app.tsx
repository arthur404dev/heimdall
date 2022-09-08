import "../styles/tailwind.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { Navbar, Auth } from "../components"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Auth>
        <Navbar />
        <Component {...pageProps} />
      </Auth>
    </SessionProvider>
  )
}

export default MyApp
