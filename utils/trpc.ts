import { createReactQueryHooks } from "@trpc/react"
import { AppRouter } from "../src/pages/api/trpc/[trpc]"

const trpc = createReactQueryHooks<AppRouter>()

export default trpc
