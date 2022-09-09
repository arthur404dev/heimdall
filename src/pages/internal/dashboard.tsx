import { NextPage } from "next"
import { CreateForm, Protected } from "../../components"

const Dashboard: NextPage = () => {
  return (
    <Protected>
      <div className='flex items-center justify-center bg-indigo-400 text-white h-screen'>
        <CreateForm />
      </div>
    </Protected>
  )
}

export default Dashboard
