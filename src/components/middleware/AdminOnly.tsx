import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { ReactNode, useEffect, useState } from "react"
import axios from "axios"

const fetchUserRole = async (user: any) => {
  const res = await axios.post("/api/helpers/user-role", { user })
  if (res.status !== 200 || !res.data.role) {
    return "unknown"
  }
  return res.data.role
}

const AdminOnly = ({ children }: { children: ReactNode }) => {
  const { data, status } = useSession()
  const router = useRouter()
  const [role, setRole] = useState("")
  // Fetch User Role
  useEffect(() => {
    ;(async () => {
      const userRole = await fetchUserRole(data?.user)
      setRole(userRole)
    })()
  }, [data])

  return <>{role && role === "admin" && children}</>
}

export default AdminOnly
