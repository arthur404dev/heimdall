import type { NextPage } from "next"
import { Suspense } from "react"

const Home: NextPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <Suspense fallback={<h1>Loading...</h1>}>
        <h1>Heimdall</h1>
      </Suspense>
    </div>
  )
}

export default Home
