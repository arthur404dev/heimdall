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

const Protected = ({ children }: { children: ReactNode }) => {
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
  // Check for unauthenticated user
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [router, status])
  // Check for unauthorized user
  useEffect(() => {
    if (role && role !== "admin") {
      router.push("/unauthorized")
    }
  }, [role])
  // Early escape if non authorized or authenticated
  if (status === "unauthenticated" || role !== "admin") return null
  // Return children if all conditions met
  return <>{children}</>
}

export default Protected
