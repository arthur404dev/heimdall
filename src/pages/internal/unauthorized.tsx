import Image from "next/image"
import Link from "next/link"

const Unauthorized = () => {
  return (
    <div className='bg-orange-300 text-gray-900 font-bold gap-4 w-screen h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl'>Oops... Access Denied!</h1>
      <Link href={"/"}>
        <div className='w-44 h-44 relative hover:cursor-pointer'>
          <Image
            alt='heimdall image'
            layout='fill'
            objectFit='cover'
            src='/images/odin.png'
          />
        </div>
      </Link>
      <h2 className='text-xl'>You are not allowed to see that content!</h2>
      <p className='text-md font-normal lowercase'>
        Heimdall has route-protection, and some parts can only be accessed by
        admins, click{" "}
        <Link href={"/"}>
          <span className='font-bold text-red-900 hover:cursor-pointer hover:text-red-800 hover:underline uppercase'>
            here
          </span>
        </Link>{" "}
        to go back.
      </p>
    </div>
  )
}

export default Unauthorized
