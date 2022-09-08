import { NextPage } from "next"
import { Protected } from "../components"

const Dashboard: NextPage = () => {
  return (
    <Protected>
      <div>Logged In!</div>
    </Protected>
  )
}

export default Dashboard
