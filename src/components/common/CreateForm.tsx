import type { NextPage } from "next"
import { useState } from "react"
import classNames from "classnames"
import { nanoid } from "nanoid"
import debounce from "lodash/debounce"
import { trpc } from "../../../utils"
import copy from "copy-to-clipboard"
import Image from "next/image"

type Form = {
  slug: string
  url: string
}

const CreateLinkForm: NextPage = () => {
  const [form, setForm] = useState<Form>({ slug: "", url: "" })
  const url = window.location.origin

  const checkSlug = trpc.useQuery(["checkSlug", { slug: form.slug }], {
    context: {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  })
  const createSlug = trpc.useMutation(["createSlug"])

  const input =
    "text-indigo-900 my-1 p-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-purple-500 block w-full rounded-md sm:text-sm focus:ring-1"

  const slugInput = classNames(input, {
    "border-red-500": checkSlug.isFetched && checkSlug.data!.used,
    "text-red-500": checkSlug.isFetched && checkSlug.data!.used,
  })

  if (createSlug.status === "success") {
    return (
      <div className='flex flex-col justify-center items-center gap-4 py-10 px-6 sm:w-2/3 md:w-1/2 lg:w-1/3 bg-indigo-900 rounded-md capitalize'>
        <h1 className='text-xl uppercase text-purple-100'>
          Gate Created Successfully!
        </h1>
        <div className='w-20 h-20 relative'>
          <Image
            alt='heimdall sad'
            layout='fill'
            objectFit='cover'
            src='/images/valkyrie.png'
          />
        </div>
        <div className='flex justify-between items-center w-full py-2 px-4 bg-indigo-700 text-indigo-400 gap-1 rounded-md relative'>
          <h1 className='lowercase font-bold'>{`${url}/${form.slug}`}</h1>
          <div
            className='h-10 w-16 flex items-center justify-center cursor-pointer bg-indigo-400 hover:bg-purple-400 rounded-r-md absolute right-0 fill-indigo-900 hover:fill-white'
            onClick={() => {
              copy(`${url}/${form.slug}`.toLowerCase(), {
                format: "text",
              })
            }}
          >
            <div className='h-10 w-10 p-2.5 fill-inherit'>
              <svg
                className='fill-inherit'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'
              >
                <path d='M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z' />
              </svg>
            </div>
          </div>
        </div>
        <input
          type='button'
          value='Reset'
          className='rounded bg-indigo-500 py-2 px-4 font-bold cursor-pointer mt-2 hover:bg-purple-400'
          onClick={() => {
            createSlug.reset()
            setForm({ slug: "", url: "" })
          }}
        />
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        createSlug.mutate({ ...form })
      }}
      className='flex flex-col justify-center items-center gap-4 py-10 px-6 sm:w-2/3 md:w-1/2 lg:w-1/3 bg-indigo-900 rounded-xl capitalize'
    >
      <h1 className='text-xl uppercase text-purple-100'>
        Create new Gate to Valhalla
      </h1>
      <div className='w-10 h-10 relative'>
        <Image
          alt='heimdall sad'
          layout='fill'
          objectFit='cover'
          src='/images/happy.png'
        />
      </div>
      {checkSlug.data?.used && (
        <span className='font-medium mr-2 text-center text-purple-500'>
          Slug already in use.
        </span>
      )}
      <div className='flex items-center flex-col gap-2 w-full'>
        <div className='flex items-center rounded-lg py-0 pr-1 pl-4 text-sm bg-gray-50 text-gray-900 border border-gray-300 gap-1 w-full'>
          <span className='text-gray-400 lowercase'>{url}/</span>
          <input
            type='text'
            onChange={(e) => {
              setForm({
                ...form,
                slug: e.target.value,
              })
              debounce(checkSlug.refetch, 100)
            }}
            id='slug'
            minLength={1}
            placeholder='heimdall'
            className={`${slugInput} border-none bg-gray-200`}
            value={form.slug}
            pattern={"^[-a-zA-Z0-9]+$"}
            title='Only alphanumeric characters and hypens are allowed. No spaces.'
            required
          />
          <div
            onClick={() => {
              const slug = nanoid()
              setForm({
                ...form,
                slug,
              })
              checkSlug.refetch()
            }}
            className='h-6 w-12 inline-flex cursor-pointer'
          >
            <svg
              className='fill-gray-400 hover:fill-purple-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
            >
              <path d='M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160H352c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V416H352c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8h32V320c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z' />
            </svg>
          </div>
        </div>
      </div>
      <div className='flex items-center rounded-lg py-0 pr-1 pl-4 text-sm bg-gray-50 text-gray-900 border border-gray-300 gap-1 w-full'>
        <span className='font-medium whitespace-nowrap text-gray-400 lowercase'>
          redirect:
        </span>
        <input
          type='url'
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          placeholder='https://heimdall.com'
          className={`${input} border-none bg-gray-200`}
          required
        />
      </div>
      <input
        type='submit'
        value='Create'
        className='rounded bg-indigo-500 py-2 px-4 font-bold cursor-pointer mt-2 hover:bg-purple-500'
        disabled={checkSlug.isFetched && checkSlug.data!.used}
      />
    </form>
  )
}

export default CreateLinkForm
