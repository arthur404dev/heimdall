import Image from "next/image"
import Link from "next/link"

const Oops = () => {
  return (
    <div className='bg-purple-800 text-gray-200 font-bold gap-4 w-screen h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl'>
        Oops... Heimdall couldn't find the gate you asked for!
      </h1>
      <Link href={"/"}>
        <div className='w-44 h-44 relative hover:cursor-pointer'>
          <Image
            alt='heimdall sad'
            layout='fill'
            objectFit='cover'
            src='/images/viking.png'
          />
        </div>
      </Link>
      <h2 className='text-xl'>Your link is not a valid redirection!</h2>
      <p className='text-md font-normal lowercase'>
        Heimdall is a forwarding tool created by an awesome dev, unfortunatelly
        the link you tried to access was not found!
      </p>
    </div>
  )
}

export default Oops
