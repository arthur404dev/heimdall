import pino from "pino"

export default pino({
  name: "heimdall",
  timestamp: true,
  //   browser: { asObject: true },
})
