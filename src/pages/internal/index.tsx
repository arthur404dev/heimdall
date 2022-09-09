import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { AdminOnly } from "../../components"

const Home: NextPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-900 text-white'>
      <Suspense fallback={<h1>Loading...</h1>}>
        <div className='flex flex-col justify-center items-center gap-4'>
          <h1 className='text-2xl font-bold'>
            Heimdall is happy to see you here!
          </h1>
          <div className='w-48 h-48 relative'>
            <Image
              alt='heimdall image'
              layout='fill'
              objectFit='cover'
              src='/images/happy.png'
            />
          </div>
          <AdminOnly>
            <p className='uppercase'>
              You have access to the following sections:
            </p>
            <Link href={"/internal/dashboard"}>
              <p className='text-xl lowercase hover:cursor-pointer hover:text-orange-500  text-orange-400 hover:font-bold'>
                /dashboard
              </p>
            </Link>
          </AdminOnly>
        </div>
      </Suspense>
    </div>
  )
}

export default Home
