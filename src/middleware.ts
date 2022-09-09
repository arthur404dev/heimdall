import { NextRequest, NextResponse, userAgent } from "next/server"
import { logger } from "../utils"

const skippedDomains = ["/_next", "/api", "/internal", "/site", "/images"]

export async function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname
  const paths = pathName.split("/")
  const slug = paths.pop()
  const agent = userAgent(req)
  const now = new Date()
  // Start routing logic
  const shouldSkip = skippedDomains.some((domain) => {
    return pathName.toLowerCase().startsWith(domain.toLowerCase())
  })
  // Skip protected pathnames
  if (!shouldSkip && paths.length === 1) {
    // Extract Data to Log
    const logData = {
      time: now.toISOString(),
      url: req.url,
      ip: req.ip,
      device: agent.device,
      bot: agent.isBot,
      os: agent.os,
      ua: agent.ua,
      geo: req.geo,
      slug: slug,
    }
    logger.info("request:%o", logData)
    // Fetch the full-URL for this request
    const apiReq = await fetch(`${req.nextUrl.origin}/api/get-full-url/${slug}`)
    if (apiReq.status === 404) {
      //Log failure
      logger.warn("oops:%o", logData)
      return NextResponse.redirect(`${req.nextUrl.origin}/internal/oops`)
    }
    // Success route
    const data = await apiReq.json()
    logger.info("received-data:%o", data)

    if (data?.url) {
      // Log Happy Path
      logger.info("success:redirect-to=%s request=%o", data.url, logData)
      return NextResponse.redirect(data.url)
    }
  }
}
