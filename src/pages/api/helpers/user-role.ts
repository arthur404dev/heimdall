import { NextApiRequest, NextApiResponse } from "next"
const rawList = process.env.ADMIN_LIST

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.body
  const adminList = rawList?.split(",")
  if (rawList?.length === 0 || adminList?.length === 0) {
    res.statusCode = 500
    return res.json({
      message: "the list received is either not populated or with wrong values",
    })
  }
  const data = { role: "default", user }
  if (adminList?.includes(user?.email)) {
    data.role = "admin"
  }
  res.setHeader("Content-Type", "application/json")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Cache-Control", "s-maxage=1000, stale-while-revalidate")
  res.statusCode = 200

  return res.json(data)
}
